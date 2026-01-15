import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { beforeAll, afterAll, afterEach } from 'vitest';
import {
    mockGetProfileSuccess,
    mockUpdateProfileSuccess
} from './lib/handlers/profile.handlers';

const globalAny = globalThis as any;
const store = new Map<string, string>();

globalAny.localStorage = {
    getItem: (key: string) => (store.has(key) ? store.get(key) : null),
    setItem: (key: string, value: string) => {
        store.set(key, value);
    },
    removeItem: (key: string) => {
        store.delete(key);
    },
    clear: () => {
        store.clear();
    },
    key: (index: number) => Array.from(store.keys())[index] ?? null,
    get length() {
        return store.size;
    }
};

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
