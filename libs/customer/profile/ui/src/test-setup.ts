import { configure } from '@testing-library/react';
import { vi, beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { mockGetProfileSuccess, mockUpdateProfileSuccess } from '@onboarding-course/customer-profile-infrastructure';

import '@testing-library/jest-dom';

configure({ testIdAttribute: 'data-hook' });

const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
    length: 0,
    key: vi.fn()
};

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true
});

export const server = setupServer(
    mockGetProfileSuccess,
    mockUpdateProfileSuccess
);

beforeAll(() => {
    server.listen();
});

afterEach(() => {
    server.resetHandlers();
});

afterAll(() => {
    server.close();
});
