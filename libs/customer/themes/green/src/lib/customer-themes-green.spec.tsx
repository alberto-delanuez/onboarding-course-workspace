import { render } from '@testing-library/react';

import OnboardingCourseCustomerThemesGreen from './customer-themes-green';

describe('OnboardingCourseCustomerThemesGreen', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OnboardingCourseCustomerThemesGreen />);
    expect(baseElement).toBeTruthy();
  });
});
