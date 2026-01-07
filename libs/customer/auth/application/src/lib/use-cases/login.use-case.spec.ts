import { AuthRepository, User } from '@onboarding-course/customer-auth-domain';
import { LoginUseCase } from './login.use-case';

describe('LoginUseCase', () => {
    it('should login user', async () => {
        const expectedUser: User = {
            id: '1',
            email: 'test.user@example.com',
            name: 'Test User',
            accessToken: 'token',
            refreshToken: 'refresh'
        };

        const authRepositoryMock: AuthRepository = {
            login: vi.fn().mockResolvedValue(expectedUser),
            register: vi.fn(),
            verify: vi.fn(),
            socialLogin: vi.fn(),
            requestOtp: vi.fn(),
            loginWithOtp: vi.fn()
        };

        const loginUseCase = new LoginUseCase(authRepositoryMock);
        const result = await loginUseCase.execute({
            email: 'test.user@example.com',
            password: 'password'
        });
        expect(result).toEqual(expectedUser);
    });

    it('should throw error when login fails', async () => {
        const authRepositoryMock: AuthRepository = {
            login: vi.fn().mockRejectedValue(new Error('Login failed')),
            register: vi.fn(),
            verify: vi.fn(),
            socialLogin: vi.fn(),
            requestOtp: vi.fn(),
            loginWithOtp: vi.fn()
        };

        const loginUseCase = new LoginUseCase(authRepositoryMock);
        await expect(
            loginUseCase.execute({
                email: 'test.user@example.com',
                password: 'password'
            })
        ).rejects.toThrow('Login failed');
    });
});
