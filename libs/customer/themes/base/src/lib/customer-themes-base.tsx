import { createTheme, ThemeOptions } from '@mui/material/styles';

// Module Augmentation to extend the theme
declare module '@mui/material/styles' {
  interface Palette {
    primary: Palette['primary'];
    secondary: Palette['secondary'];
    tertiary: Palette['tertiary'];
    navbar: Palette['primary'];
  }
  interface PaletteOptions {
    primary?: PaletteOptions['primary'];
    secondary?: PaletteOptions['secondary'];
    tertiary?: PaletteOptions['tertiary'];
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
