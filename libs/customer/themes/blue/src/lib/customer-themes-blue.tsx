import { createTheme, ThemeOptions } from '@mui/material/styles';
import { baseThemeOptions } from '@onboarding-course/customer-themes-base';

export const blueThemeOptions: ThemeOptions = {
  ...baseThemeOptions,
  palette: {
    primary: {
      main: '#0d47a1', // Deep Blue
    },
    secondary: {
      main: '#546e7a', // Blue Grey
    },
  },
  shape: {
    borderRadius: 4,
  },
};

export const blueTheme = createTheme(blueThemeOptions);
