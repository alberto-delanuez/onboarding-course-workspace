import { AuthRepository, User } from '@onboarding-course/customer-auth-domain';

export class SocialLoginUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  execute(provider: string, token: string): Promise<User> {
    return this.authRepository.socialLogin(provider, token);
  }
}
