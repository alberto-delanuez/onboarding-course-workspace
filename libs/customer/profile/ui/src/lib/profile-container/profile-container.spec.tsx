import { render, screen, waitFor } from '@testing-library/react';
import { ProfileContainer } from './profile-container';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IntlProvider } from 'react-intl';
import { DIContainer, GetProfileUseCaseToken, UpdateProfileUseCaseToken } from '@onboarding-course/customer-common-di';
import { GetProfileUseCase, UpdateProfileUseCase } from '@onboarding-course/customer-profile-application';
import { ProfileHttpRepository, mockGetProfileError } from '@onboarding-course/customer-profile-infrastructure';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { server } from '../../test-setup';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false
        }
    }
});

const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
        <IntlProvider locale="en">
            {children}
        </IntlProvider>
    </QueryClientProvider>
);

describe('ProfileContainer', () => {
    beforeEach(() => {
        DIContainer.clear();
        const profileRepo = new ProfileHttpRepository('https://api.example.com');
        const getProfileUseCase = new GetProfileUseCase(profileRepo);
        const updateProfileUseCase = new UpdateProfileUseCase(profileRepo);
        
        DIContainer.set(GetProfileUseCaseToken, getProfileUseCase);
        DIContainer.set(UpdateProfileUseCaseToken, updateProfileUseCase);
        
        localStorage.setItem('token', 'token');
    });

    afterEach(() => {
        DIContainer.clear();
        queryClient.clear();
        localStorage.clear();
        server.resetHandlers();
    });

    it('should show loading state initially', () => {
        render(<ProfileContainer />, { wrapper: Wrapper });
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('should show user profile when loaded', async () => {
        render(<ProfileContainer />, { wrapper: Wrapper });

        await waitFor(() => {
            expect(screen.getByText('user.test@example.com')).toBeInTheDocument();
            expect(screen.getByText('User Test')).toBeInTheDocument();
        });
    });

    it('should show error message when loading fails', async () => {
        server.use(mockGetProfileError);
        render(<ProfileContainer />, { wrapper: Wrapper });

        await waitFor(() => {
            expect(screen.getByRole('alert')).toBeInTheDocument();
        });
    });
});
