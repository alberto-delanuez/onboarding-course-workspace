import { LoginDto } from '@onboarding-course/customer-auth-domain';
import { DIContainer } from '@onboarding-course/customer-common-di';
import { mutationOptions } from '@tanstack/react-query';
import { LoginUseCaseToken } from '@onboarding-course/customer-auth-application';

export const authMutation = {
    login: () =>
        mutationOptions({
            mutationKey: ['auth.login'],
            mutationFn: (credentials: LoginDto) => {
                const loginUseCase = DIContainer.get(LoginUseCaseToken);
                return loginUseCase.execute(credentials);
            }
        })
};
