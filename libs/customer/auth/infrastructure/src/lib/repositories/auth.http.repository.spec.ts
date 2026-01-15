import { describe, it, expect } from 'vitest';
import { AuthHttpRepository } from './auth.http.repository';
import { LoginDto } from '@onboarding-course/customer-auth-domain';
import { server } from '../../test-setup';
import { mockLoginError, mockLoginUser } from '../handlers/auth.handlers';

describe('AuthHttpRepository', () => {
    it('login should make POST request to /auth/login and return user', async () => {
        const repo = new AuthHttpRepository('https://api.example.com');

        const credentials: LoginDto = {
            email: 'user.test@example.com',
            password: 'password'
        };

        const result = await repo.login(credentials);

        expect(result).toEqual(mockLoginUser);
    });

    it('login should throw error when response is not ok', async () => {
        server.use(mockLoginError);

        const repo = new AuthHttpRepository('https://api.example.com');

        const credentials: LoginDto = {
            email: 'user.test@example.com',
            password: 'password'
        };

        await expect(repo.login(credentials)).rejects.toThrow('Login failed');
    });
});
