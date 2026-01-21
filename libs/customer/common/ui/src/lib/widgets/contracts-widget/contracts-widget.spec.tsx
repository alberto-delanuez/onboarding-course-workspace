import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { ContractsWidget } from './contracts-widget';
import { MemoryRouter } from 'react-router-dom';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <IntlProvider locale="en">
    <MemoryRouter>{children}</MemoryRouter>
  </IntlProvider>
);

describe('ContractsWidget', () => {
  it('renders title and list of contracts', () => {
    render(
      <Wrapper>
        <ContractsWidget />
      </Wrapper>
    );

    expect(screen.getByText('My Contracts')).toBeInTheDocument();

    expect(screen.getByText('Go Max Cinema')).toBeInTheDocument();
    expect(screen.getByText('Home Fiber 1Gbps')).toBeInTheDocument();
    expect(screen.getByText('Family TV Pack')).toBeInTheDocument();
  });
});
