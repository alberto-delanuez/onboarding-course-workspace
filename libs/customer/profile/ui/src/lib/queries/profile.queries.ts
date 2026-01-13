import { queryOptions } from '@tanstack/react-query';
import { GetProfileUseCase } from '@onboarding-course/customer-profile-application';
import { ProfileHttpRepository } from '@onboarding-course/customer-profile-infrastructure';

const repository = new ProfileHttpRepository(ProfileHttpRepository.getApiUrl());
const getProfileUseCase = new GetProfileUseCase(repository);

export const profileQueries = {
  getProfile: () =>
    queryOptions({
      queryKey: ['profile'],
      queryFn: () => getProfileUseCase.execute(),
    })
};

