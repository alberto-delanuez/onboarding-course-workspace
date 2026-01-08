import { render } from '@testing-library/react';

import OnboardingCourseCustomerAuthDomain from './customer-auth-domain';

describe('OnboardingCourseCustomerAuthDomain', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OnboardingCourseCustomerAuthDomain />);
    expect(baseElement).toBeTruthy();
  });
});
