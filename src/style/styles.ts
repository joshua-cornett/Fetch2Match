import { Theme } from '@mui/material/styles';

export const commonBoxStyles = (theme: Theme) => ({
  centerContent: {
    display: 'flex',
    flexBasis: '100dvw',
    flex: '1 1 auto',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: theme.spacing(4),
  },
  fullHeightContainer: {
    padding: theme.spacing(4),
    backgroundColor: theme.palette.primary.main,
    height: '90dvh',
    marginTop: '10dvh',
    display: 'flex',
    flexDirection: 'column',
  },
});

export const commonFormStyles = (theme: Theme) => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '100px',
    width: '100%',
    maxWidth: '400px',
    marginBottom: theme.spacing(3),
  },
  textField: {
    marginBottom: theme.spacing(2),
    '& .MuiInputLabel-root': {
      color: theme.palette.text.primary,
    },
  },
  submitButton: {
    padding: theme.spacing(1.5, 3),
    borderRadius: theme.shape.borderRadius,
    fontWeight: theme.typography.button.fontWeight,
    width: '100%',
  },
});
