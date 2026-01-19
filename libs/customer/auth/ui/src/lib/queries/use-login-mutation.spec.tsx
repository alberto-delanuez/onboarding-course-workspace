import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useLoginMutation } from './use-login-mutation';
import {
    DIContainer,
} from '@onboarding-course/customer-common-di';
import { LoginUseCaseToken } from '@onboarding-course/customer-auth-application';
import { type ReactNode } from 'react';

describe('useLoginMutation', () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: false },
            mutations: { retry: false }
        }
    });

    const wrapper = ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    it('executes login use case and calls onSuccess', async () => {
        const execute = vi.fn().mockResolvedValue({ accessToken: 'mock-token' } as any);
        DIContainer.set(LoginUseCaseToken, { execute } as any);

        const onSuccess = vi.fn();
        const onError = vi.fn();

        const { result } = renderHook(
            () => useLoginMutation({ onSuccess, onError }),
            { wrapper }
        );

        const mutateAsync = result.current;

        await mutateAsync({
            email: 'user@example.com',
            password: 'password123'
        });

        await waitFor(() => {
            expect(execute).toHaveBeenCalledWith({
                email: 'user@example.com',
                password: 'password123'
            });
            expect(onSuccess).toHaveBeenCalled();
            expect(onError).not.toHaveBeenCalled();
        });
    });
});

