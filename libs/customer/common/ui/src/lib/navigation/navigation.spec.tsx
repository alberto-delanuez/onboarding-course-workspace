import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { Navigation } from './navigation';

describe('Navigation', () => {
    const renderNav = (overrides?: {
        onLogout?: () => void;
        onLocaleChange?: (locale: string) => void;
        currentLocale?: string;
    }) => {
        const onLogout = overrides?.onLogout ?? vi.fn();
        const onLocaleChange = overrides?.onLocaleChange ?? vi.fn();
        const currentLocale = overrides?.currentLocale ?? 'en';

        render(
            <IntlProvider locale="en">
                <MemoryRouter>
                    <Navigation
                        title="My App"
                        onLogout={onLogout}
                        currentLocale={currentLocale}
                        onLocaleChange={onLocaleChange}
                    />
                </MemoryRouter>
            </IntlProvider>
        );

        return { onLogout, onLocaleChange };
    };

    it('renders title and navigation links', () => {
        renderNav();

        expect(screen.getByText('My App')).toBeInTheDocument();
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Profile')).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    it('calls onLogout when logout button is clicked', async () => {
        const user = userEvent.setup();
        const { onLogout } = renderNav();

        await user.click(screen.getByText('Logout'));

        expect(onLogout).toHaveBeenCalled();
    });

    it('calls onLocaleChange when a language is selected', async () => {
        const user = userEvent.setup();
        const { onLocaleChange } = renderNav();

        await user.click(screen.getByText('EN'));
        await user.click(screen.getByText('Español'));

        expect(onLocaleChange).toHaveBeenCalledWith('es');
    });
});
