import { createAuthClient } from '@neondatabase/neon-js/auth';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authClient: any = createAuthClient(
    import.meta.env.VITE_NEON_AUTH_URL || 'http://localhost:3000'
);
