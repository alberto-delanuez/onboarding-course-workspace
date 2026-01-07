import '@testing-library/jest-dom';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { ErrorBoundary } from './error-boundary';

const ProblemChild = () => {
    throw new Error('Test error');
};

describe('ErrorBoundary', () => {
    const originalError = console.error;

    afterEach(() => {
        console.error = originalError;
    });

    it('renders children when there is no error', () => {
        render(
            <IntlProvider locale="en">
                <ErrorBoundary>
                    <div data-hook="content">No error</div>
                </ErrorBoundary>
            </IntlProvider>
        );

        expect(screen.getByTestId('content')).toBeInTheDocument();
    });

    it('renders fallback UI when a child throws', () => {
        console.error = vi.fn();

        render(
            <IntlProvider locale="en">
                <ErrorBoundary>
                    <ProblemChild />
                </ErrorBoundary>
            </IntlProvider>
        );

        expect(
            screen.getByText('page.errorBoundary.errorOccurred')
        ).toBeInTheDocument();
        expect(screen.getByText(/Test error/)).toBeInTheDocument();
    });
});
