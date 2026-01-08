import { render } from '@testing-library/react';

import OnboardingCourseCustomerAuthApplication from './customer-auth-application';

describe('OnboardingCourseCustomerAuthApplication', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OnboardingCourseCustomerAuthApplication />);
    expect(baseElement).toBeTruthy();
  });
});
