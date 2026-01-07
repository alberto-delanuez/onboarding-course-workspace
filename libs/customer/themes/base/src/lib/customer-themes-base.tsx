import { createTheme, ThemeOptions } from '@mui/material/styles';

// Module Augmentation to extend the theme
declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
    navbar: Palette['primary'];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
    navbar?: PaletteOptions['primary'];
  }
}

export const baseThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
};

export const baseTheme = createTheme(baseThemeOptions);
