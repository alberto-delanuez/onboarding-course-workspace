import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { authQueries } from './auth-queries';
import { User } from '@onboarding-course/customer-auth-domain';

export const useVerifyQuery = (
    options?: Partial<UseQueryOptions<User, Error>>
) => {
    return useQuery({
        ...authQueries.verify(),
        ...options
    } as UseQueryOptions<User, Error>);
};
