import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginContainer } from './login-container';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DIContainer, LoginUseCaseToken } from '@onboarding-course/customer-common-di';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
        mutations: {
            retry: false,
        }
    }
});

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <IntlProvider locale="en">
        <MemoryRouter>{children}</MemoryRouter>
    </IntlProvider>
  </QueryClientProvider>
);

describe('LoginContainer', () => {
  const mockLoginExecute = vi.fn();

  beforeEach(() => {
    const mockLoginUseCase = {
        execute: mockLoginExecute
    };
    DIContainer.set(LoginUseCaseToken, mockLoginUseCase as any);
  });

  afterEach(() => {
    DIContainer.clear();
    vi.restoreAllMocks();
    queryClient.clear();
  });

  it('should render login form elements', () => {
    render(<LoginContainer />, { wrapper: Wrapper });
    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByTestId('submit')).toBeInTheDocument();
  });

  it('should call login use case on valid submit', async () => {
    mockLoginExecute.mockResolvedValue({ accessToken: 'mock-token' });
    const user = userEvent.setup();

    render(<LoginContainer />, { wrapper: Wrapper });

    const emailInput = screen.getByTestId('email').querySelector('input');
    const passwordInput = screen.getByTestId('password').querySelector('input');
    const submitButton = screen.getByTestId('submit');

    if (!emailInput || !passwordInput) throw new Error('Inputs not found');

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockLoginExecute).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('should show error message on login failure', async () => {
    mockLoginExecute.mockRejectedValue(new Error('Invalid credentials'));
    
    const user = userEvent.setup();
    
    render(<LoginContainer />, { wrapper: Wrapper });

    const emailInput = screen.getByTestId('email').querySelector('input');
    const passwordInput = screen.getByTestId('password').querySelector('input');
    const submitButton = screen.getByTestId('submit');

    if (!emailInput || !passwordInput) throw new Error('Inputs not found');

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'wrongpassword');
    await user.click(submitButton);

    await waitFor(() => {
        const alert = screen.getByRole('alert');
        expect(alert).toHaveTextContent('Invalid credentials or login failed');
    });
  });
});
