import { Theme, alpha } from '@mui/material/styles';

// Extends the base theme to encapsulate common, non-MUI styling

// Box styling
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
    height: '100%',
    minHeight: '90dvh',
    marginTop: '10dvh',
    display: 'flex',
    flexDirection: 'column',
  },
});

// Form styling
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

// DogCard styling
export const dogCardStyles = (theme: Theme) => ({
  cardContainer: {
    position: 'relative',
    height: 250,
    maxWidth: 200,
    overflow: 'hidden',
    boxShadow: theme.shadows[5],
    backgroundColor: theme.palette.primary.main,
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    '&:hover, &.favoritedCard': {
      transform: 'scale(1.03)',
      boxShadow: `0 0 15px 3px ${theme.palette.secondary.light}`,
    },
    '&:hover .cardMedia, &.favoritedCard .cardMedia': {
      transform: 'translateY(-25px) scale(1.25)',
      height: 275,
      objectPosition: 'center',
    },
    '&:hover .cardContent, &.favoritedCard .cardContent': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  cardMedia: {
    maxWidth: 250,
    minWidth: 250,
    height: 300,
    objectFit: 'cover',
    objectPosition: 'center',
    transition: 'transform 0.3s ease, height 0.3s ease',
    borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
  },
  cardContent: {
    color: theme.palette.common.white,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: alpha(theme.palette.primary.light, 0.7),
    padding: theme.spacing(2),
    opacity: 0,
    transform: 'translateY(100%)',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
  },
  heartButton: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    borderRadius: '50%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.primary.main,
    },
    '&:hover .favoriteIcon': {
      transform: 'scale(1.25)',
      color: theme.palette.primary.main,
    },
  },
  favoritedCard: {
    boxShadow: `0 0 10px 3px ${theme.palette.secondary.light}`,
  },
  favoriteIcon: {
    fontSize: '1.6rem',
    color: theme.palette.secondary.light,
    transition: 'color 0.3s ease',
  },
  favoritedIcon: {
    fontSize: 'rem',
    color: theme.palette.primary.main,
    transform: 'scale(1.25)',
  },
  favoritedButton: {
    backgroundColor: theme.palette.secondary.light,
  },
  // Blinking glow animation for the heart button when the card is hovered and not favorited
  cardContainerHoveredNotFavorited: {
    '&:hover .heartButtonNotFavorited': {
      animation: 'blink-glow 1s infinite',
    },
    '@keyframes blink-glow': {
      '0%': {
        boxShadow: `0 0 5px 2px ${theme.palette.secondary.light}`,
      },
      '50%': {
        boxShadow: `0 0 20px 5px ${theme.palette.secondary.light}`,
      },
      '100%': {
        boxShadow: `0 0 5px 2px ${theme.palette.secondary.light}`,
      },
    },
  },
});
