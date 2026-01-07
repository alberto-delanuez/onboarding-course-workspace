import { configure } from '@testing-library/react';
import { vi, beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

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

const mockLoginUser = {
    id: '1',
    email: 'user.test@example.com',
    name: 'User Test',
    accessToken: 'token',
    refreshToken: 'refresh'
};

export const server = setupServer(
    http.post('*/auth/login', () => HttpResponse.json(mockLoginUser))
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
