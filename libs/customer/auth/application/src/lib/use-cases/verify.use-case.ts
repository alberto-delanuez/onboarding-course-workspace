import { AuthRepository, User } from '@onboarding-course/customer-auth-domain';

export class VerifyUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  execute(token: string): Promise<User> {
    return this.authRepository.verify(token);
  }
}
