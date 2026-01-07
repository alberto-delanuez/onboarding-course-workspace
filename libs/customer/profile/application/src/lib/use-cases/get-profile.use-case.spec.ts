import { ProfileRepository, UserProfile } from '@onboarding-course/customer-profile-domain';
import { GetProfileUseCase } from './get-profile.use-case';

describe('GetProfileUseCase', () => {
    it('should return profile from repository', async () => {
        const expectedProfile: UserProfile = {
            id: '1',
            username: 'user.test',
            firstName: 'User',
            lastName: 'Test',
            email: 'user.test@example.com',
            phone: '123456789',
            address: {
                address: '123 Main St',
                city: 'City',
                state: 'State',
                postalCode: '12345'
            }
        };

        const repositoryMock: ProfileRepository = {
            getProfile: vi.fn().mockResolvedValue(expectedProfile),
            updateProfile: vi.fn()
        };

        const useCase = new GetProfileUseCase(repositoryMock);

        const result = await useCase.execute();

        expect(repositoryMock.getProfile).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expectedProfile);
    });

    it('should propagate errors from repository', async () => {
        const error = new Error('Failed to load profile');

        const repositoryMock: ProfileRepository = {
            getProfile: vi.fn().mockRejectedValue(error),
            updateProfile: vi.fn()
        };

        const useCase = new GetProfileUseCase(repositoryMock);

        await expect(useCase.execute()).rejects.toThrow('Failed to load profile');
        expect(repositoryMock.getProfile).toHaveBeenCalledTimes(1);
    });
});

