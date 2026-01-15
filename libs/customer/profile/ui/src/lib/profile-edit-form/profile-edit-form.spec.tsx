import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProfileEditForm } from './profile-edit-form';
import { IntlProvider } from 'react-intl';
import { UserProfile } from '@onboarding-course/customer-profile-domain';
import { vi, describe, it, expect } from 'vitest';

const mockUser: UserProfile = {
    id: '1',
    username: 'test',
    email: 'test.user@example.com',
    firstName: 'Test',
    lastName: 'User',
    phone: '123456789',
    address: {
        address: 'Main St',
        city: 'City',
        state: 'State',
        postalCode: '12345'
    }
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <IntlProvider locale="en">{children}</IntlProvider>
);

describe('ProfileEditForm', () => {
    it('should render form with user data', () => {
        render(
            <ProfileEditForm
                user={mockUser}
                onSubmit={vi.fn()}
                onCancel={vi.fn()}
            />,
            { wrapper: Wrapper }
        );

        expect(screen.getByDisplayValue('Test')).toBeInTheDocument();
        expect(screen.getByDisplayValue('User')).toBeInTheDocument();
        expect(screen.getByDisplayValue('123456789')).toBeInTheDocument();
    });

    it('should submit form with updated data', async () => {
        const handleSubmit = vi.fn().mockResolvedValue(mockUser);
        const user = userEvent.setup();

        render(
            <ProfileEditForm
                user={mockUser}
                onSubmit={handleSubmit}
                onCancel={vi.fn()}
            />,
            { wrapper: Wrapper }
        );

        const firstNameInput = screen.getByTestId('firstName').querySelector('input');
        if (!firstNameInput) throw new Error('Input not found');

        await user.clear(firstNameInput);
        await user.type(firstNameInput, 'Jane');

        const submitButton = screen.getByTestId('submit');
        await user.click(submitButton);

        await waitFor(() => {
            expect(handleSubmit).toHaveBeenCalledWith({
                    firstName: 'Jane',
                    lastName: mockUser.lastName,
                    phone: mockUser.phone,
                    address: mockUser.address
                }, expect.any(Object)
            );
        });
    });

    it('should show validation error when field is empty and submitted', async () => {
        const user = userEvent.setup();

        render(
            <ProfileEditForm
                user={mockUser}
                onSubmit={vi.fn()}
                onCancel={vi.fn()}
            />,
            { wrapper: Wrapper }
        );

        const firstNameInput = screen.getByTestId('firstName').querySelector('input');
        if (!firstNameInput) throw new Error('Input not found');

        await user.clear(firstNameInput);
        
        const submitButton = screen.getByTestId('submit');
        await user.click(submitButton);

        await waitFor(() => {
            // Check for any validation error message containing "required" or the ID
            const alert = screen.getByRole('alert');
            expect(alert.textContent).toMatch(/required|customer.edit-profile.firstNameRequired/i);
        });
    });
});
