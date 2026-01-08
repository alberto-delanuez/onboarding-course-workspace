import { render } from '@testing-library/react';

import OnboardingCourseCustomerThemesBase from './customer-themes-base';

describe('OnboardingCourseCustomerThemesBase', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OnboardingCourseCustomerThemesBase />);
    expect(baseElement).toBeTruthy();
  });
});
