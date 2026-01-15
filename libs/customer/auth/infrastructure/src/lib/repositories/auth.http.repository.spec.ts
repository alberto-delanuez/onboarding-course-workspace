import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AuthHttpRepository } from './auth.http.repository';
import { LoginDto, User } from '@onboarding-course/customer-auth-domain';

describe('AuthHttpRepository', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn());
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('login should make POST request to /auth/login and return user', async () => {
        const mockUser: User = {
            id: '1',
            email: 'john.doe@example.com',
            name: 'John Doe',
            accessToken: 'token',
            refreshToken: 'refresh'
        };

        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockUser)
        });

        vi.stubGlobal('fetch', fetchMock);

        const repo = new AuthHttpRepository('https://api.example.com');

        const credentials: LoginDto = {
            email: 'user.test@example.com',
            password: 'password'
        };

        const result = await repo.login(credentials);

        expect(fetchMock).toHaveBeenCalledWith(
            'https://api.example.com/auth/login',
            expect.objectContaining({
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: 'usert',
                    password: 'password'
                })
            })
        );
        expect(result).toEqual(mockUser);
    });

    it('login should throw error when response is not ok', async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: false
        });

        vi.stubGlobal('fetch', fetchMock);

        const repo = new AuthHttpRepository('https://api.example.com');

        const credentials: LoginDto = {
            email: 'user.test@example.com',
            password: 'password'
        };

        await expect(repo.login(credentials)).rejects.toThrow('Login failed');
    });
});
