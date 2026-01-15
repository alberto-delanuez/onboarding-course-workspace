import { describe, it, expect, beforeEach, vi } from 'vitest';
import { authMutation } from './auth-mutation';
import {
    DIContainer,
    LoginUseCaseToken,
    SocialLoginUseCaseToken,
    RequestOtpUseCaseToken,
    LoginWithOtpUseCaseToken
} from '@onboarding-course/customer-common-di';

describe('authMutation', () => {
    beforeEach(() => {
        DIContainer.clear();
    });

    it('login mutation calls LoginUseCase with credentials', async () => {
        const execute = vi.fn().mockResolvedValue({ accessToken: 'token' });
        DIContainer.set(LoginUseCaseToken, { execute } as any);

        const { mutationFn } = authMutation.login();
        //@ts-ignore
        await mutationFn({ email: 'user@example.com', password: 'secret' });

        expect(execute).toHaveBeenCalledWith({
            email: 'user@example.com',
            password: 'secret'
        });
    });

    it('socialLogin mutation calls SocialLoginUseCase with provider and mock token', async () => {
        const execute = vi.fn().mockResolvedValue({ accessToken: 'token' });
        DIContainer.set(SocialLoginUseCaseToken, { execute } as any);

        const { mutationFn } = authMutation.socialLogin();
        //@ts-ignore
        await mutationFn('google');

        expect(execute).toHaveBeenCalledWith('google', 'mock_token');
    });

    it('requestOtp mutation calls RequestOtpUseCase with email', async () => {
        const execute = vi.fn().mockResolvedValue(undefined);
        DIContainer.set(RequestOtpUseCaseToken, { execute } as any);

        const { mutationFn } = authMutation.requestOtp();
        //@ts-ignore
        await mutationFn('user@example.com');

        expect(execute).toHaveBeenCalledWith('user@example.com');
    });

    it('loginWithOtp mutation calls LoginWithOtpUseCase with email and code', async () => {
        const execute = vi.fn().mockResolvedValue({ accessToken: 'token' });
        DIContainer.set(LoginWithOtpUseCaseToken, { execute } as any);

        const { mutationFn } = authMutation.loginWithOtp();
        //@ts-ignore
        await mutationFn({ email: 'user@example.com', code: '123456' });

        expect(execute).toHaveBeenCalledWith('user@example.com', '123456');
    });
});
