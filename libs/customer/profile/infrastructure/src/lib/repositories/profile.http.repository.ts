import {
    ProfileRepository,
    UpdateProfileDto,
    UserProfile
} from '@onboarding-course/customer-profile-domain';

export class ProfileHttpRepository implements ProfileRepository {
    constructor(
        protected baseUrl: string = ProfileHttpRepository.getApiUrl()
    ) {}

    static getApiUrl() {
        return import.meta.env.VITE_API_URL;
    }

    async getProfile(): Promise<unknown> {
        const response = await fetch(`${this.baseUrl}/auth/me`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch profile');
        }

        return response.json() as Promise<UserProfile>;
    }

    async updateProfile(
        id: string,
        data: UpdateProfileDto
    ): Promise<UserProfile> {
        const response = await fetch(`${this.baseUrl}/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to update profile');
        }

        return response.json() as Promise<UserProfile>;
    }
}
