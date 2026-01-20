import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DIContainer } from '@onboarding-course/customer-common-di';
import {
    GetProfileUseCaseToken,
    UpdateProfileUseCaseToken
} from '@onboarding-course/customer-profile-application';
import { UpdateProfileDto } from '@onboarding-course/customer-profile-domain';

export const profileQueries = {
    details: () =>
        queryOptions({
            queryKey: ['AUTH.VERIFY'],
            queryFn: () => {
                const getProfileUseCase = DIContainer.get(
                    GetProfileUseCaseToken
                );
                return getProfileUseCase.execute();
            }
        })
};

export const profileMutation = {
    update: () =>
        mutationOptions({
            mutationKey: ['PROFILE.UPDATE'],
            mutationFn: ({
                id,
                data
            }: {
                id: string;
                data: UpdateProfileDto;
            }) => {
                const updateProfileUseCase = DIContainer.get(
                    UpdateProfileUseCaseToken
                );
                return updateProfileUseCase.execute(id, data);
            }
        })
};
