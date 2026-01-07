import { User } from '@onboarding-course/customer-auth-domain';
import { authMutation } from './auth-mutation';
import { useMutation } from '@tanstack/react-query';

export const useSocialLoginMutation = ({
    onSuccess,
    onError
}: {
    onSuccess: (data: User) => void;
    onError: (error: Error) => void;
}) => {
    return useMutation<User, Error, string, unknown>({
        ...authMutation.socialLogin(),
        onSuccess,
        onError
    }).mutateAsync;
};
