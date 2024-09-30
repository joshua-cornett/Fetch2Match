// Style imports
import base from './theme-base';

// MUI imports
import { createTheme } from '@mui/material/styles';

const { palette, typography, spacing } = base;

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    light: true;
  }
}

// Extends the base theme to customize MUI component default styling
const theme = createTheme(base, {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: 'max-content',
          backgroundColor: base.palette.primary.main,
          color: base.palette.text.secondary,
          padding: base.spacing(1.5, 3),
          '&:hover': {
            backgroundColor: base.palette.secondary.light,
            color: base.palette.text.primary,
          },
          width: '100%',
          height: '48px',
          '@media (min-width:600px)': {
            width: 'auto',
          },
        },
      },
      variants: [
        {
          props: { variant: 'light' },
          style: {
            backgroundColor: base.palette.secondary.light,
            color: base.palette.text.primary,
            '&:hover': {
              backgroundColor: base.palette.primary.light,
              color: base.palette.text.secondary,
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
