import { Module, Global, OnModuleInit, Inject } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import type { NeonQueryFunction } from '@neondatabase/serverless';

export const DRIZZLE = 'DRIZZLE';
export const NEON_SQL = 'NEON_SQL';

@Global()
@Module({
    providers: [
        {
            provide: NEON_SQL,
            useFactory: () => {
                const url = process.env.DATABASE_URL ?? '';
                return neon(url);
            }
        },
        {
            provide: DRIZZLE,
            useFactory: (sql: any) => drizzle(sql),
            inject: [NEON_SQL]
        }
    ],
    exports: [DRIZZLE, NEON_SQL]
})
export class DatabaseModule implements OnModuleInit {
    constructor(
        @Inject(NEON_SQL) private readonly sql: NeonQueryFunction<false, false>
    ) {}
    async onModuleInit() {
        if (!process.env.DATABASE_URL) {
            return;
        }
        try {
            await this.sql`
                CREATE TABLE IF NOT EXISTS users (
                    id uuid PRIMARY KEY,
                    email varchar(255) NOT NULL UNIQUE,
                    name varchar(255) NOT NULL,
                    password_hash text NOT NULL,
                    created_at timestamptz NOT NULL DEFAULT NOW(),
                    updated_at timestamptz NOT NULL DEFAULT NOW()
                );
            `;
        } catch {}
    }
}
