import {
    AuthRepository,
    LoginDto,
    RegisterDto,
    User
} from '@onboarding-course/customer-auth-domain';

export class AuthHttpRepository implements AuthRepository {
    constructor(protected authClient: any) {}
    async login(credentials: LoginDto): Promise<User> {
        const { data, error } = await this.authClient.signIn.email({
            email: credentials.email,
            password: credentials.password
        });

        if (error) {
            throw new Error(error.message || 'Login failed');
        }

        if (!data || !data.user) {
            throw new Error('Login failed: No user data returned');
        }

        return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name ?? '',
            accessToken: typeof data.token === 'string' ? data.token : '',
            refreshToken: '' // Session managed by cookie/SDK
        };
    }

    async register(data: RegisterDto): Promise<User> {
        const { data: result, error } = await this.authClient.signUp.email({
            email: data.email,
            password: data.password,
            name: data.name
        });

        if (error) {
            throw new Error(error.message || 'Register failed');
        }

        if (!result || !result.user) {
            throw new Error('Register failed: No user data returned');
        }

        return {
            id: result.user.id,
            email: result.user.email,
            name: result.user.name ?? '',
            accessToken: typeof result.token === 'string' ? result.token : '',
            refreshToken: ''
        };
    }

    async verify(): Promise<User> {
        // Neon Auth SDK manages session, but if we need manual verification:
        const { data, error } = await this.authClient.getSession();

        if (error || !data) {
            throw new Error('Token verification failed');
        }
        console.log('data', data);

        return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            accessToken:
                typeof data.session?.token === 'string'
                    ? data.session.token
                    : '',
            refreshToken: ''
        };
    }

    async socialLogin(provider: string): Promise<void> {
        const { error } = await this.authClient.signIn.social({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            provider: provider as any,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            callbackURL: '/auth/callback'
        });

        if (error) {
            throw new Error(error.message || 'Social login failed');
        }
    }

    async requestOtp(email: string): Promise<void> {
        // Try to find the correct method for sending OTP.
        // In Better Auth, it might be separate. Assuming a standard pattern or accessing via any if types are incomplete.
        // If signIn.emailOtp requires otp, we can't use it for request.
        // We will try to use the generic 'signIn' with type if available or assume 'emailOtp' plugin structure.

        // Fallback: Using 'any' to bypass strict type check if we believe the method supports overload,
        // OR using a more likely method name if it exists in the client.

        // Actually, for email OTP, often it is:
        const { error } =
            await // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.authClient.emailOtp.sendVerificationOtp({
                email,
                type: 'sign-in'
            });

        if (error) {
            throw new Error(error.message || 'OTP request failed');
        }
    }

    async loginWithOtp(email: string, code: string): Promise<User> {
        const { data, error } = await this.authClient.signIn.emailOtp({
            email,
            otp: code
        });

        if (error) {
            throw new Error(error.message || 'OTP verification failed');
        }

        if (!data || !data.user) {
            throw new Error('OTP login failed: No user data returned');
        }

        return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name ?? '',
            accessToken: typeof data.token === 'string' ? data.token : '',
            refreshToken: ''
        };
    }
}
