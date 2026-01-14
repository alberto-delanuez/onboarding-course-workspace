import { mutationOptions, queryOptions } from '@tanstack/react-query';
import {
    GetProfileUseCaseToken,
    UpdateProfileUseCaseToken,
    DIContainer
} from '@onboarding-course/customer-common-di';
import { UpdateProfileDto } from '@onboarding-course/customer-profile-domain';

export const profileQueries = {
    details: () =>
        queryOptions({
            queryKey: ['PROFILE.DETAILS'],
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
