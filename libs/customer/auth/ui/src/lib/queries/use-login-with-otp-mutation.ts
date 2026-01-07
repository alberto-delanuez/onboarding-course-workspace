import { useMutation } from '@tanstack/react-query';
import { authMutation } from './auth-mutation';
import { User } from '@onboarding-course/customer-auth-domain';

type LoginWithOtpVariables = { email: string; code: string };

export const useLoginWithOtpMutation = ({
    onSuccess,
    onError
}: {
    onSuccess: (data: User, variables: LoginWithOtpVariables, context: unknown) => void;
    onError: (error: Error, variables: LoginWithOtpVariables, context: unknown) => void;
}) => {
    return useMutation<User, Error, LoginWithOtpVariables, unknown>({
        ...authMutation.loginWithOtp(),
        onSuccess,
        onError
    }).mutateAsync;
};
