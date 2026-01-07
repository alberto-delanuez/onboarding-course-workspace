import { describe, it, expect } from 'vitest';
import { ProfileHttpRepository } from './profile.http.repository';
import { UpdateProfileDto } from '@onboarding-course/customer-profile-domain';
import { server } from '../../test-setup';
import {
    mockGetProfileError,
    mockUpdateProfileError,
    mockUserProfile
} from '../handlers/profile.handlers';

describe('ProfileHttpRepository', () => {
    it('getProfile should make GET request to /auth/me and return profile', async () => {
        const repo = new ProfileHttpRepository('https://api.example.com');

        const result = await repo.getProfile();

        expect(result).toEqual(mockUserProfile);
    });

    it('getProfile should throw error when response is not ok', async () => {
        server.use(mockGetProfileError);

        const repo = new ProfileHttpRepository('https://api.example.com');

        await expect(repo.getProfile()).rejects.toThrow(
            'Failed to fetch profile'
        );
    });

    it('updateProfile should make PUT request to /users/:id and return updated profile', async () => {
        const repo = new ProfileHttpRepository('https://api.example.com');

        const dto: UpdateProfileDto = {
            firstName: 'Updated',
            lastName: 'User'
        };

        const result = await repo.updateProfile('1', dto);

        expect(result).toEqual(
            expect.objectContaining({
                ...mockUserProfile,
                ...dto
            })
        );
    });

    it('updateProfile should throw error when response is not ok', async () => {
        server.use(mockUpdateProfileError);

        const repo = new ProfileHttpRepository('https://api.example.com');

        const dto: UpdateProfileDto = {
            firstName: 'Updated'
        };

        await expect(repo.updateProfile('1', dto)).rejects.toThrow(
            'Failed to update profile'
        );
    });
});
