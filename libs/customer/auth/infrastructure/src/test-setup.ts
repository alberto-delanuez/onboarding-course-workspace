import { configure } from '@testing-library/react';
import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { beforeAll, afterAll, afterEach } from 'vitest';
import { mockLoginSuccess } from './lib/handlers/auth.handlers';

configure({ testIdAttribute: 'data-hook' });

export const server = setupServer(mockLoginSuccess);

beforeAll(() => {
    server.listen();
});

afterEach(() => {
    server.resetHandlers();
});

afterAll(() => {
    server.close();
});
