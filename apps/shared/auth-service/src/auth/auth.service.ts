import {
    Injectable,
    UnauthorizedException,
    BadRequestException,
    Inject
} from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto.js';
import { LoginDto } from './dtos/login.dto.js';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { eq } from 'drizzle-orm';
import { users } from './schema.js';
import { DRIZZLE } from '../db/database.module.js';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
    constructor(
        @Inject(DRIZZLE) private readonly db: any,
        private readonly jwt: JwtService
    ) {}

    async register(dto: RegisterDto) {
        const existing = await this.db
            .select()
            .from(users)
            .where(eq(users.email, dto.email))
            .limit(1);
        const exists = existing.length > 0 ? existing[0] : null;
        if (exists) throw new BadRequestException('Email already in use');
        const hash = await bcrypt.hash(dto.password, 10);
        const id = randomUUID();
        await this.db.insert(users).values({
            id,
            email: dto.email,
            name: dto.name,
            passwordHash: hash
        });
        const accessToken = await this.jwt.signAsync({
            sub: id,
            email: dto.email,
            name: dto.name
        });
        return { id, email: dto.email, name: dto.name, accessToken };
    }

    async login(dto: LoginDto) {
        const rows = await this.db
            .select()
            .from(users)
            .where(eq(users.email, dto.email))
            .limit(1);
        const user = rows.length > 0 ? rows[0] : null;
        if (!user) throw new UnauthorizedException('Invalid credentials');
        const ok = await bcrypt.compare(dto.password, user.passwordHash);
        if (!ok) throw new UnauthorizedException('Invalid credentials');
        const accessToken = await this.jwt.signAsync({
            sub: user.id,
            email: user.email,
            name: user.name
        });
        return { id: user.id, email: user.email, name: user.name, accessToken };
    }

    async verify(authHeader?: string) {
        if (!authHeader) throw new UnauthorizedException('Missing token');
        const [scheme, token] = authHeader.split(' ');
        if (scheme !== 'Bearer' || !token)
            throw new UnauthorizedException('Invalid token');
        const payload = await this.jwt.verifyAsync(token).catch(() => null);
        if (!payload) throw new UnauthorizedException('Invalid token');
        const rows = await this.db
            .select()
            .from(users)
            .where(eq(users.id, payload.sub))
            .limit(1);
        const user = rows.length > 0 ? rows[0] : null;
        if (!user) throw new UnauthorizedException('User not found');
        return { id: user.id, email: user.email, name: user.name };
    }
}
