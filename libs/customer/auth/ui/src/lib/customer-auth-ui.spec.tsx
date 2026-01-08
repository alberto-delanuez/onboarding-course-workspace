import { render } from '@testing-library/react';

import OnboardingCourseCustomerAuthUi from './customer-auth-ui';

describe('OnboardingCourseCustomerAuthUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OnboardingCourseCustomerAuthUi />);
    expect(baseElement).toBeTruthy();
  });
});
