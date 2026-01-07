import { describe, it, expect, vi } from 'vitest';
import { LoginWithOtpUseCase } from './login-with-otp.use-case';
import { AuthRepository, User } from '@onboarding-course/customer-auth-domain';

describe('LoginWithOtpUseCase', () => {
    it('should call repository.loginWithOtp with correct params and return user', async () => {
        const expectedUser: User = {
            id: '2',
            email: 'user@example.com',
            name: 'User',
            accessToken: 'token',
            refreshToken: 'refresh'
        };

        const authRepositoryMock: AuthRepository = {
            login: vi.fn(),
            register: vi.fn(),
            verify: vi.fn(),
            socialLogin: vi.fn(),
            requestOtp: vi.fn(),
            loginWithOtp: vi.fn().mockResolvedValue(expectedUser)
        };

        const useCase = new LoginWithOtpUseCase(authRepositoryMock);

        const result = await useCase.execute('user@example.com', '123456');

        expect(authRepositoryMock.loginWithOtp).toHaveBeenCalledWith(
            'user@example.com',
            '123456'
        );
        expect(result).toEqual(expectedUser);
    });

    it('should propagate errors from repository', async () => {
        const error = new Error('Invalid OTP');
        const authRepositoryMock: AuthRepository = {
            login: vi.fn(),
            register: vi.fn(),
            verify: vi.fn(),
            socialLogin: vi.fn(),
            requestOtp: vi.fn(),
            loginWithOtp: vi.fn().mockRejectedValue(error)
        };

        const useCase = new LoginWithOtpUseCase(authRepositoryMock);

        await expect(
            useCase.execute('user@example.com', '000000')
        ).rejects.toThrow('Invalid OTP');
    });
});
