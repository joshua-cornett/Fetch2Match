// Style imports
import base from './theme-base';

// MUI imports
import { createTheme } from '@mui/material/styles';

const { palette, typography, spacing } = base;

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    logout: true;
  }
}

// Extends the base theme to customize MUI component default styling
const theme = createTheme(base, {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: palette.primary.main,
          color: palette.text.secondary,
          padding: spacing(1.5, 3),
          '&:hover': {
            backgroundColor: palette.secondary.light,
            color: palette.text.primary,
          },
        },
      },
      variants: [
        {
          props: { variant: 'logout' },
          style: {
            backgroundColor: palette.secondary.light,
            color: palette.text.primary,
            '&:hover': {
              backgroundColor: palette.primary.main,
              color: palette.text.secondary,
            },
          },
        },
      ],
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          position: 'fixed',
          backgroundColor: palette.background.default,
          color: palette.text.primary,
          padding: spacing(1),
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            color: palette.text.primary,
          },
          marginBottom: spacing(2),
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h4: {
          fontWeight: typography.h4.fontWeight,
          color: palette.primary.main,
          marginBottom: spacing(3),
        },
      },
    },
  },
});

export default theme;
