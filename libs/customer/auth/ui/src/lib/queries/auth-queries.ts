import { queryOptions } from '@tanstack/react-query';
import { DIContainer } from '@onboarding-course/customer-common-di';
import { VerifyUseCaseToken } from '@onboarding-course/customer-auth-application';
import { queryKeys } from './query-keys';

export const authQueries = {
    verify: (token: string) =>
        queryOptions({
            queryKey: queryKeys.authVerify,
            queryFn: () => {
                const verifyUseCase = DIContainer.get(VerifyUseCaseToken);
                return verifyUseCase.execute(token);
            }
        })
};
