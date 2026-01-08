import { ProfileRepository, UpdateProfileDto, UserProfile } from '@onboarding-course/customer-profile-domain';

export class ProfileHttpRepository implements ProfileRepository {
  async getProfile(id: string): Promise<UserProfile> {
    const response = await fetch(`/api/profile/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }
    
    return response.json() as Promise<UserProfile>;
  }

  async updateProfile(id: string, data: UpdateProfileDto): Promise<UserProfile> {
    const response = await fetch(`/api/profile/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    return response.json() as Promise<UserProfile>;
  }
}
