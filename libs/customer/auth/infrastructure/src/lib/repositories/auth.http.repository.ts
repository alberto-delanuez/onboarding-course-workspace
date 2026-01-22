import {
    AuthRepository,
    LoginDto,
    RegisterDto,
    User
} from '@onboarding-course/customer-auth-domain';

export class AuthHttpRepository implements AuthRepository {
    constructor(protected baseUrl: string = AuthHttpRepository.getApiUrl()) {}

    static getApiUrl() {
        return import.meta.env.AUTH_SERVICE_URL;
    }

    async login(credentials: LoginDto): Promise<User> {
        const response = await fetch(`${this.baseUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            })
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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Register failed');
        }

        // DummyJSON returns the created user object
        return response.json() as Promise<User>;
    }

    async verify(token: string): Promise<User> {
        const response = await fetch(`${this.baseUrl}/auth/me`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Token verification failed');
        }

        return response.json() as Promise<User>;
    }

    async socialLogin(provider: string, token: string): Promise<User> {
        // Simulate a successful login for demo purposes
        return {
            id: '1',
            email: 'social@example.com',
            name: `${provider} User`,
            // HACK: DummyJSON token from user to access profile
            accessToken:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJvbGl2aWF3IiwiZW1haWwiOiJvbGl2aWEud2lsc29uQHguZHVtbXlqc29uLmNvbSIsImZpcnN0TmFtZSI6Ik9saXZpYSIsImxhc3ROYW1lIjoiV2lsc29uIiwiZ2VuZGVyIjoiZmVtYWxlIiwiaW1hZ2UiOiJodHRwczovL2R1bW15anNvbi5jb20vaWNvbi9vbGl2aWF3LzEyOCIsImlhdCI6MTc2ODMwMjk0NSwiZXhwIjoxNzY4MzA2NTQ1fQ.8rqLdKxGkosVJOTIUTNxbY0GEmd8rb711YBZy6DYYT0',
            refreshToken: 'mock_social_refresh_token'
        };
    }

    async requestOtp(email: string): Promise<void> {
        // In a real app, this would call an API endpoint like POST /auth/otp/request
        return Promise.resolve();
    }

    async loginWithOtp(email: string, code: string): Promise<User> {
        if (code !== '123456') {
            throw new Error('Invalid OTP code');
        }

        return {
            id: '2',
            email: email,
            name: 'OTP User',
            // HACK: DummyJSON token from user to access profile
            accessToken:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJvbGl2aWF3IiwiZW1haWwiOiJvbGl2aWEud2lsc29uQHguZHVtbXlqc29uLmNvbSIsImZpcnN0TmFtZSI6Ik9saXZpYSIsImxhc3ROYW1lIjoiV2lsc29uIiwiZ2VuZGVyIjoiZmVtYWxlIiwiaW1hZ2UiOiJodHRwczovL2R1bW15anNvbi5jb20vaWNvbi9vbGl2aWF3LzEyOCIsImlhdCI6MTc2ODMwMjk0NSwiZXhwIjoxNzY4MzA2NTQ1fQ.8rqLdKxGkosVJOTIUTNxbY0GEmd8rb711YBZy6DYYT0',
            refreshToken: 'mock_otp_refresh_token'
        };
    }
}

// Removed DummyJSON-specific username parsing
