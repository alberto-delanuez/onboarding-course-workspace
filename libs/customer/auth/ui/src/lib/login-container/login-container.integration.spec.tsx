import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LoginContainer } from './login-container';
import {
    DIContainer
} from '@onboarding-course/customer-common-di';
import { LoginUseCase, LoginUseCaseToken } from '@onboarding-course/customer-auth-application';
import { AuthHttpRepository, mockLoginError } from '@onboarding-course/customer-auth-infrastructure';
import { server } from '../../test-setup';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false
        },
        mutations: {
            retry: false
        }
    }
});

const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
        <IntlProvider locale="en">
            <MemoryRouter initialEntries={['/login']}>
                <Routes>
                    <Route path="/login" element={children} />
                    <Route
                        path="/dashboard"
                        element={<div data-hook="dashboard" />}
                    />
                </Routes>
            </MemoryRouter>
        </IntlProvider>
    </QueryClientProvider>
);

describe('Login integration', () => {
    beforeEach(() => {
        DIContainer.clear();

        const authRepo = new AuthHttpRepository('https://dummyjson.com');
        const loginUseCase = new LoginUseCase(authRepo);
        DIContainer.set(LoginUseCaseToken, loginUseCase);
    });

    afterEach(() => {
        DIContainer.clear();
        queryClient.clear();
    });

    it('should login successfully and navigate to dashboard', async () => {
        const user = userEvent.setup();

        render(<LoginContainer />, { wrapper: Wrapper });

        const emailInput = screen.getByTestId('email').querySelector('input');
        const passwordInput =
            screen.getByTestId('password').querySelector('input');
        const submitButton = screen.getByTestId('submit');

        if (!emailInput || !passwordInput) {
            throw new Error('Inputs not found');
        }

        await user.type(emailInput, 'user.test@example.com');
        await user.type(passwordInput, 'password');
        await user.click(submitButton);

        await waitFor(() => {
            expect(window.localStorage.setItem).toHaveBeenCalledWith(
                'token',
                'token'
            );
            expect(screen.getByTestId('dashboard')).toBeInTheDocument();
        });
    });

    it('should show error message when login fails', async () => {
        server.use(mockLoginError);
        const user = userEvent.setup();

        render(<LoginContainer />, { wrapper: Wrapper });

        const emailInput = screen.getByTestId('email').querySelector('input');
        const passwordInput =
            screen.getByTestId('password').querySelector('input');
        const submitButton = screen.getByTestId('submit');

        if (!emailInput || !passwordInput) {
            throw new Error('Inputs not found');
        }

        await user.type(emailInput, 'user.test@example.com');
        await user.type(passwordInput, 'wrongpassword');
        await user.click(submitButton);

        await waitFor(() => {
            expect(
                screen.getByText(/Invalid credentials or login failed/i)
            ).toBeInTheDocument();
        });
    });
});
