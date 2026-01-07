import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { BaseLayout } from './base-layout';

describe('BaseLayout', () => {
  const renderWithRouter = () =>
    render(
      <IntlProvider locale="en">
        <MemoryRouter initialEntries={['/dashboard']}>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <BaseLayout
                  title="My App"
                  currentLocale="en"
                  onLocaleChange={() => {}}
                />
              }
            >
              <Route path="/dashboard" element={<div data-hook="content" />} />
            </Route>
            <Route path="/login" element={<div data-hook="login-page" />} />
          </Routes>
        </MemoryRouter>
      </IntlProvider>
    );

  it('renders navigation and outlet content', () => {
    renderWithRouter();

    expect(screen.getByText('My App')).toBeInTheDocument();
  });
});
