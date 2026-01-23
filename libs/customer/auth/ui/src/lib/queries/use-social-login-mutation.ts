import { authMutation } from './auth-mutation';
import { useMutation } from '@tanstack/react-query';

export const useSocialLoginMutation = () => {
    return useMutation<void, Error, string, unknown>(authMutation.socialLogin())
        .mutateAsync;
};
