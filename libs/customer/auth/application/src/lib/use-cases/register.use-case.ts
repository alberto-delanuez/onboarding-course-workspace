import { AuthRepository, RegisterDto, User } from '@onboarding-course/customer-auth-domain';

export class RegisterUseCase {
  constructor(private readonly repository: AuthRepository) {}

  execute(data: RegisterDto): Promise<User> {
    return this.repository.register(data);
  }
}
