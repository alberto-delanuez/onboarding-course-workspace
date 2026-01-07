import { useMutation } from '@tanstack/react-query';
import { authMutation } from './auth-mutation';

export const useRequestOtpMutation = ({
    onSuccess,
    onError
}: {
    onSuccess: (data: void, variables: string, context: unknown) => void;
    onError: (error: Error, variables: string, context: unknown) => void;
}) => {
    return useMutation<void, Error, string, unknown>({
        ...authMutation.requestOtp(),
        onSuccess,
        onError
    }).mutateAsync;
};
