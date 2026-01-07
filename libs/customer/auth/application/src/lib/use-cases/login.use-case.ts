import { AuthRepository, LoginDto, User } from '@onboarding-course/customer-auth-domain';

export class LoginUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  execute(credentials: LoginDto): Promise<User> {
    return this.authRepository.login(credentials);
  }
}
