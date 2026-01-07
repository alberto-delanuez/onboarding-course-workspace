import { AuthRepository } from '@onboarding-course/customer-auth-domain';

export class RequestOtpUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  execute(email: string): Promise<void> {
    return this.authRepository.requestOtp(email);
  }
}
