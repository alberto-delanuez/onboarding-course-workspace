import { ProfileRepository, UserProfile } from '@onboarding-course/customer-profile-domain';

export class GetProfileUseCase {
  constructor(private readonly repository: ProfileRepository) {}

  execute(id: string): Promise<UserProfile> {
    return this.repository.getProfile(id);
  }
}
