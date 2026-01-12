import { createTheme, ThemeOptions } from '@mui/material/styles';
import { baseThemeOptions } from '@onboarding-course/customer-themes-base';

export const purpleThemeOptions: ThemeOptions = {
  ...baseThemeOptions,
  palette: {
    primary: {
      main: '#9c27b0', // Purple
    },
    secondary: {
      main: '#ff9800', // Orange
    },
    tertiary: {
      main: '#e1bee7', // Light Purple
    },
    navbar: {
      main: '#4a148c', // Deep Purple
    },
  },
  typography: {
    fontFamily: ['Montserrat', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
    h1: {
      fontWeight: 800,
      fontSize: '3rem',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.25rem',
      letterSpacing: '-0.01em',
    },
    body1: {
      fontSize: '1.125rem',
      lineHeight: 1.6,
    }
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    ...baseThemeOptions.components,
    MuiCssBaseline: {
      styleOverrides: `
        body {
          font-family: 'Inter', "Helvetica Neue", Arial, sans-serif;
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          textTransform: 'none',
          padding: '12px 24px',
          fontWeight: 600,
        },
        contained: {
          boxShadow: '0 4px 12px rgba(156, 39, 176, 0.3)',
          '&:hover': {
            boxShadow: '0 6px 16px rgba(156, 39, 176, 0.4)',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'filled',
      },
      styleOverrides: {
        root: {
          '& .MuiFilledInput-root': {
            borderRadius: 12,
            backgroundColor: '#f3e5f5', // Very light purple
            '&:hover': {
              backgroundColor: '#e1bee7',
            },
            '&.Mui-focused': {
              backgroundColor: '#e1bee7',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
          border: 'none',
        },
      },
    },
  },
};

export const purpleTheme = createTheme(purpleThemeOptions);
