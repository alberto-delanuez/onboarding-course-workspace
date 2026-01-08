import { render } from '@testing-library/react';

import OnboardingCourseCustomerAuthInfrastructure from './customer-auth-infrastructure';

describe('OnboardingCourseCustomerAuthInfrastructure', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <OnboardingCourseCustomerAuthInfrastructure />
    );
    expect(baseElement).toBeTruthy();
  });
});
