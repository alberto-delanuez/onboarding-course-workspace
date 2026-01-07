import { useMutation } from '@tanstack/react-query';
import { authMutation } from './auth-mutation';
import { LoginDto, User } from '@onboarding-course/customer-auth-domain';

export const useLoginMutation = ({
    onSuccess,
    onError
}: {
    onSuccess: (data: User, variables: LoginDto, context: unknown) => void;
    onError: (error: Error, variables: LoginDto, context: unknown) => void;
}) => {
    return useMutation<User, Error, LoginDto, unknown>({
        ...authMutation.login(),
        onSuccess,
        onError
    }).mutateAsync;
};
