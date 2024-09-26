import { createTheme } from '@mui/material/styles';

// Font imports
import './fonts.css';

// Type Extensions

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
  }
}

const base = createTheme({
  palette: {
    primary: {
      main: '#5F259F',
      dark: '#300d38',
      light: '#900075',
    },
    secondary: {
      main: '#F15A22',
      light: '#ffa900',
    },
    tertiary: {
      main: '#4be3d9',
      light: '#80eae2',
      dark: '#3ddfcd',
    },
    background: {
      default: '#F7F7F7',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#300d38',
      secondary: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Syne", "Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
});

export default base;
