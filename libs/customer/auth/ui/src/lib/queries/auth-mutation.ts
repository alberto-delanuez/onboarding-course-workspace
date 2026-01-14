import { LoginDto } from '@onboarding-course/customer-auth-domain';
import { DIContainer } from '@onboarding-course/customer-common-di';
import { mutationOptions } from '@tanstack/react-query';
import {
    LoginUseCaseToken,
    SocialLoginUseCaseToken,
    RequestOtpUseCaseToken,
    LoginWithOtpUseCaseToken
} from '@onboarding-course/customer-auth-application';

export const authMutation = {
    login: () =>
        mutationOptions({
            mutationKey: ['AUTH.LOGIN'],
            mutationFn: (credentials: LoginDto) => {
                const loginUseCase = DIContainer.get(LoginUseCaseToken);
                return loginUseCase.execute(credentials);
            }
        }),
    socialLogin: () =>
        mutationOptions({
            mutationKey: ['AUTH.SOCIAL_LOGIN'],
            mutationFn: (provider: string) => {
                const socialLoginUseCase = DIContainer.get(
                    SocialLoginUseCaseToken
                );
                return socialLoginUseCase.execute(provider, 'mock_token');
            }
        }),
    requestOtp: () =>
        mutationOptions({
            mutationKey: ['AUTH.REQUEST_OTP'],
            mutationFn: (email: string) => {
                const requestOtpUseCase = DIContainer.get(
                    RequestOtpUseCaseToken
                );
                return requestOtpUseCase.execute(email);
            }
        }),
    loginWithOtp: () =>
        mutationOptions({
            mutationKey: ['AUTH.LOGIN_WITH_OTP'],
            mutationFn: ({ email, code }: { email: string; code: string }) => {
                const loginWithOtpUseCase = DIContainer.get(
                    LoginWithOtpUseCaseToken
                );
                return loginWithOtpUseCase.execute(email, code);
            }
        })
};
