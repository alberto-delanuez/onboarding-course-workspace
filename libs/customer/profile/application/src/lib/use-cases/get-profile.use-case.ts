import { ProfileRepository } from '@onboarding-course/customer-profile-domain';

export class GetProfileUseCase {
    constructor(private readonly repository: ProfileRepository) {}

    execute(): Promise<unknown> {
        return this.repository.getProfile();
    }
}
