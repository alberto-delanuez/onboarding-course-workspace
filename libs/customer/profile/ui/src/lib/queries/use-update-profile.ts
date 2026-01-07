import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserProfile } from '@onboarding-course/customer-profile-domain';
import { UpdateProfileDto } from '@onboarding-course/customer-profile-domain';
import { profileMutation } from './profile-queries';

export const useUpdateUserProfileMutation = () => {
    const queryClient = useQueryClient();
    return useMutation<
        UserProfile,
        Error,
        { id: string; data: UpdateProfileDto },
        unknown
    >({
        ...profileMutation.update(),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['PROFILE.DETAILS']
            });
        }
    }).mutateAsync;
};
