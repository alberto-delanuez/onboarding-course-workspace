import { DIToken } from '@onboarding-course/customer-common-di';
import { ProfileRepository } from '@onboarding-course/customer-profile-domain';
import { GetProfileUseCase } from './use-cases/get-profile.use-case';
import { UpdateProfileUseCase } from './use-cases/update-profile.use-case';

export const ProfileRepositoryToken = new DIToken<ProfileRepository>('ProfileRepository');
export const GetProfileUseCaseToken = new DIToken<GetProfileUseCase>('GetProfileUseCase');
export const UpdateProfileUseCaseToken = new DIToken<UpdateProfileUseCase>('UpdateProfileUseCase');

