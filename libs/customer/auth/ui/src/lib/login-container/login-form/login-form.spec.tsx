import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './login-form';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';


// Wrapper component to provide necessary contexts
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <IntlProvider locale="en">
    <MemoryRouter>{children}</MemoryRouter>
  </IntlProvider>
);

describe('LoginForm', () => {
  it('should render form elements', () => {
    render(
      <Wrapper>
        <LoginForm onSubmit={vi.fn()} />
      </Wrapper>
    );

    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByTestId('submit')).toBeInTheDocument();
  });

  it('should call onSubmit with entered credentials when form is valid', async () => {
    const handleSubmit = vi.fn().mockResolvedValue(undefined);

    render(
      <Wrapper>
        <LoginForm onSubmit={handleSubmit} />
      </Wrapper>
    );

    const emailInput = screen.getByTestId('email').querySelector('input');
    const passwordInput = screen.getByTestId('password').querySelector('input');
    const submitButton = screen.getByTestId('submit');

    // Need to check if inputs are found correctly inside the MUI TextField
    if (!emailInput || !passwordInput) {
      throw new Error('Inputs not found');
    }

    //change to userEvent
    await userEvent.type(emailInput, 'user.test@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(submitButton);  

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        email: 'user.test@example.com',
        password: 'password123',
      }, expect.any(Object)); // This accepts any event object as second argument
    });
  });

  it('should show validation error for invalid email', async () => {
    render(
      <Wrapper>
        <LoginForm onSubmit={vi.fn()} />
      </Wrapper>
    );

    const emailInput = screen.getByTestId('email').querySelector('input');
    const submitButton = screen.getByTestId('submit');

    if (!emailInput) throw new Error('Input not found');

    await userEvent.type(emailInput, 'invalid-email');
    await userEvent.click(submitButton);

    await waitFor(() => {
        const alerts = screen.getAllByRole('alert');
        expect(alerts.length).toBeGreaterThan(0);
    });
  });

  it('should show validation error for empty password', async () => {
    render(
      <Wrapper>
        <LoginForm onSubmit={vi.fn()} />
      </Wrapper>
    );

    const emailInput = screen.getByTestId('email').querySelector('input');
    const passwordInput = screen.getByTestId('password').querySelector('input');
    const submitButton = screen.getByTestId('submit');

    if (!emailInput || !passwordInput)  throw new Error('Input not found');

    await userEvent.type(emailInput, 'test.user@example.com');
   // await userEvent.type(passwordInput, '');
    await userEvent.click(submitButton);

    await waitFor(() => {
        const alerts = screen.getAllByRole('alert');
        expect(alerts.length).toBeGreaterThan(0);
    });
  });
});
