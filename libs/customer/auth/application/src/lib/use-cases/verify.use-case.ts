import { AuthRepository, User } from '@onboarding-course/customer-auth-domain';

export class VerifyUseCase {
    constructor(private readonly authRepository: AuthRepository) {}

    execute(): Promise<User> {
        return this.authRepository.verify();
    }
}
