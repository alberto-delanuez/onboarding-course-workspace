import { queryOptions } from '@tanstack/react-query';
import { GetProfileUseCaseToken } from '@onboarding-course/customer-profile-application';
import { DIContainer } from '@onboarding-course/customer-common-di';

export const profileQueries = {
    details: () =>
        queryOptions({
            queryKey: ['profile.details'],
            queryFn: () => {
                const getProfileUseCase = DIContainer.get(
                    GetProfileUseCaseToken
                );
                return getProfileUseCase.execute();
            }
        })
};
