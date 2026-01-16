import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUpdateUserProfileMutation } from './use-update-profile';
import { DIContainer } from '@onboarding-course/customer-common-di';
import {
    UpdateProfileUseCaseToken,
    UpdateProfileUseCase
} from '@onboarding-course/customer-profile-application';
import { ProfileHttpRepository } from '@onboarding-course/customer-profile-infrastructure';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

const queryClient = new QueryClient({
    defaultOptions: {
        mutations: {
            retry: false
        }
    }
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useUpdateUserProfileMutation', () => {
    beforeEach(() => {
        DIContainer.clear();
        const profileRepo = new ProfileHttpRepository('https://api.example.com');
        const updateProfileUseCase = new UpdateProfileUseCase(profileRepo);
        DIContainer.set(UpdateProfileUseCaseToken, updateProfileUseCase);
        localStorage.setItem('token', 'token');
    });

    afterEach(() => {
        DIContainer.clear();
        queryClient.clear();
        localStorage.clear();
    });

    it('should update user profile successfully', async () => {
        const { result } = renderHook(() => useUpdateUserProfileMutation(), { wrapper });

        const mutate = result.current;
        const response = await mutate({
            id: '1',
            data: { firstName: 'Updated' }
        });

        expect(response).toEqual(expect.objectContaining({
            firstName: 'Updated'
        }));
    });
});
