import { setupServer } from 'msw/node';
import { beforeAll, afterAll, afterEach } from 'vitest';
import { mockLoginSuccess } from './lib/handlers/auth.handlers';

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
