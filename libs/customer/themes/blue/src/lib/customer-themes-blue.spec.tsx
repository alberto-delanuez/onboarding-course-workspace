import { render } from '@testing-library/react';

import OnboardingCourseCustomerThemesBlue from './customer-themes-blue';

describe('OnboardingCourseCustomerThemesBlue', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OnboardingCourseCustomerThemesBlue />);
    expect(baseElement).toBeTruthy();
  });
});
