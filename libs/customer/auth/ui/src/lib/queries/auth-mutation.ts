import { LoginDto } from '@onboarding-course/customer-auth-domain';
import { DIContainer } from '@onboarding-course/customer-common-di';
import {
    LoginUseCaseToken,
    SocialLoginUseCaseToken,
    RequestOtpUseCaseToken,
    LoginWithOtpUseCaseToken
} from '@onboarding-course/customer-auth-application';
import { mutationOptions } from '@tanstack/react-query';
import { mutationKeys } from './query-keys';

export const authMutation = {
    login: () =>
        mutationOptions({
            mutationKey: mutationKeys.authLogin,
            mutationFn: (credentials: LoginDto) => {
                const loginUseCase = DIContainer.get(LoginUseCaseToken);
                return loginUseCase.execute(credentials);
            }
        }),
    socialLogin: () =>
        mutationOptions({
            mutationKey: mutationKeys.authSocialLogin,
            mutationFn: (provider: string) => {
                const socialLoginUseCase = DIContainer.get(
                    SocialLoginUseCaseToken
                );
                return socialLoginUseCase.execute(provider, 'mock_token');
            }
        }),
    requestOtp: () =>
        mutationOptions({
            mutationKey: mutationKeys.authRequestOtp,
            mutationFn: (email: string) => {
                const requestOtpUseCase = DIContainer.get(
                    RequestOtpUseCaseToken
                );
                return requestOtpUseCase.execute(email);
            }
        }),
    loginWithOtp: () =>
        mutationOptions({
            mutationKey: mutationKeys.authLoginOtp,
            mutationFn: ({ email, code }: { email: string; code: string }) => {
                const loginWithOtpUseCase = DIContainer.get(
                    LoginWithOtpUseCaseToken
                );
                return loginWithOtpUseCase.execute(email, code);
            }
        })
};
