import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUserProfileQuery } from './use-profile-query';
import { DIContainer, GetProfileUseCaseToken } from '@onboarding-course/customer-common-di';
import { GetProfileUseCase } from '@onboarding-course/customer-profile-application';
import { ProfileHttpRepository } from '@onboarding-course/customer-profile-infrastructure';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false
        }
    }
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useUserProfileQuery', () => {
    beforeEach(() => {
        DIContainer.clear();
        const profileRepo = new ProfileHttpRepository('https://api.example.com');
        const getProfileUseCase = new GetProfileUseCase(profileRepo);
        DIContainer.set(GetProfileUseCaseToken, getProfileUseCase);
        localStorage.setItem('token', 'token');
    });

    afterEach(() => {
        DIContainer.clear();
        queryClient.clear();
        localStorage.clear();
    });

    it('should fetch user profile successfully', async () => {
        const { result } = renderHook(() => useUserProfileQuery(), { wrapper });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data).toEqual(expect.objectContaining({
            email: 'user.test@example.com'
        }));
    });
});
