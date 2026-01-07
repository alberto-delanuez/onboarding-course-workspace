import {
    ProfileRepository,
    UpdateProfileDto,
    UserProfile
} from '@onboarding-course/customer-profile-domain';
import { UpdateProfileUseCase } from './update-profile.use-case';

describe('UpdateProfileUseCase', () => {
    it('should call repository.updateProfile with id and data and return updated profile', async () => {
        const id = '1';
        const dto: UpdateProfileDto = {
            firstName: 'Updated',
            lastName: 'User',
            phone: '987654321'
        };

        const expectedProfile: UserProfile = {
            id,
            username: 'user.test',
            firstName: 'Updated',
            lastName: 'User',
            email: 'user.test@example.com',
            phone: '987654321',
            address: {
                address: '123 Main St',
                city: 'City',
                state: 'State',
                postalCode: '12345'
            }
        };

        const repositoryMock: ProfileRepository = {
            getProfile: vi.fn(),
            updateProfile: vi.fn().mockResolvedValue(expectedProfile)
        };

        const useCase = new UpdateProfileUseCase(repositoryMock);

        const result = await useCase.execute(id, dto);

        expect(repositoryMock.updateProfile).toHaveBeenCalledWith(id, dto);
        expect(result).toEqual(expectedProfile);
    });

    it('should propagate errors from repository', async () => {
        const id = '1';
        const dto: UpdateProfileDto = {
            firstName: 'Updated'
        };
        const error = new Error('Update failed');

        const repositoryMock: ProfileRepository = {
            getProfile: vi.fn(),
            updateProfile: vi.fn().mockRejectedValue(error)
        };

        const useCase = new UpdateProfileUseCase(repositoryMock);

        await expect(useCase.execute(id, dto)).rejects.toThrow('Update failed');
        expect(repositoryMock.updateProfile).toHaveBeenCalledWith(id, dto);
    });
});

