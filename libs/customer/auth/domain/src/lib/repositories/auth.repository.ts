import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { User } from '../models/user.model';

export interface AuthRepository {
  login(credentials: LoginDto): Promise<User>;
  register(data: RegisterDto): Promise<User>;
  verify(token: string): Promise<User>;
}
