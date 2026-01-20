import { useQuery } from '@tanstack/react-query';
import { authQueries } from './auth-queries';

export const useVerifyQuery = (token: string | null) => {
    const safeToken = token ?? '';
    return useQuery({
        ...authQueries.verify(safeToken),
        enabled: token !== null
    });
};
