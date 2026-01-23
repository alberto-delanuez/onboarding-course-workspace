import { AuthRepository, User } from '@onboarding-course/customer-auth-domain';

export class SocialLoginUseCase {
    constructor(private readonly authRepository: AuthRepository) {}

    execute(provider: string): Promise<void> {
        return this.authRepository.socialLogin(provider);
    }
}
