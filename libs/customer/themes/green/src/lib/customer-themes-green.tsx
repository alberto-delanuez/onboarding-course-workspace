import { createTheme, ThemeOptions } from '@mui/material/styles';
import { baseThemeOptions } from '@onboarding-course/customer-themes-base';
  
export const greenThemeOptions: ThemeOptions = {
  ...baseThemeOptions,
  palette: {
    primary: {
      main: '#2e7d32', // Green
    },
    secondary: {
      main: '#66bb6a', // Light Green
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    ...baseThemeOptions.components,
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 20,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 8px 16px 0 rgba(0,0,0,0.1)',
        },
      },
    },
  },
};

export const greenTheme = createTheme(greenThemeOptions);
