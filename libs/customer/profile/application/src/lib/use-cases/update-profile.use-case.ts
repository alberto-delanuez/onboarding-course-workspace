import { ProfileRepository, UpdateProfileDto, UserProfile } from '@onboarding-course/customer-profile-domain';

export class UpdateProfileUseCase {
  constructor(private readonly repository: ProfileRepository) {}

  execute(id: string, data: UpdateProfileDto): Promise<UserProfile> {
    return this.repository.updateProfile(id, data);
  }
}
