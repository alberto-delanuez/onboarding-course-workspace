import { AuthRepository, User } from '@onboarding-course/customer-auth-domain';

export class LoginWithOtpUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  execute(email: string, code: string): Promise<User> {
    return this.authRepository.loginWithOtp(email, code);
  }
}
