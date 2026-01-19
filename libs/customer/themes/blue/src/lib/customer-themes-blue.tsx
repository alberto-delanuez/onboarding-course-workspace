import { createTheme, ThemeOptions } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import { baseThemeOptions } from '@onboarding-course/customer-themes-base';

export const blueThemeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#1976d2', // Blue
    },
    secondary: {
      main: '#2e7d32', // Green
    },
    tertiary: {
      main: '#bbdefb', // Light Blue
    },
    navbar: {
      main: '#0d47a1', // Dark Blue
    },
  },
  typography: {
    fontFamily: ['Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4, // Formal, slightly rounded
          textTransform: 'uppercase', // Formal style
          padding: '8px 16px',
        },
        contained: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          border: '1px solid #e0e0e0',
        },
      },
    },
  },
};

export const blueTheme = createTheme(deepmerge(baseThemeOptions, blueThemeOptions));
