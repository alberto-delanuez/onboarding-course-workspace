import { AuthRepository, LoginDto, RegisterDto, User } from '@onboarding-course/customer-auth-domain';

export class AuthHttpRepository implements AuthRepository {
  constructor(protected baseUrl: string){
  }

  async login(credentials: LoginDto): Promise<User> {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json() as Promise<User>;
  }

  async register(data: RegisterDto): Promise<User> {
    const response = await fetch(`${this.baseUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Register failed');
    }

    // DummyJSON returns the created user object
    return response.json() as Promise<User>;
  }
}
