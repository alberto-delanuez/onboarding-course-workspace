import { configure } from '@testing-library/react';
import { vi } from 'vitest';

import '@testing-library/jest-dom';
configure({ testIdAttribute: 'data-hook' });

// Mock localStorage
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
