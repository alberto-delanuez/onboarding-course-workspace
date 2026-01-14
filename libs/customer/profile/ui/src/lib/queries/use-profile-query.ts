import { useQuery } from '@tanstack/react-query';
import { profileQueries } from './profile-queries';
import { UserProfile } from '@onboarding-course/customer-profile-domain';

export const useUserProfileQuery = () => {
    return useQuery({
        ...profileQueries.details(),
        enabled: localStorage.getItem('token') !== null,
        select: (data: unknown) => data as UserProfile
    });
};
