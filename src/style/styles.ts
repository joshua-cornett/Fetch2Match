import { Theme, alpha } from '@mui/material/styles';

// Extends the base theme to encapsulate common, non-MUI styling

// Box styling
export const commonBoxStyles = (theme: Theme) => ({
  headerBox: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
    '& h2': {
      color: theme.palette.secondary.light,
    },
    '& p': {
      color: theme.palette.text.secondary,
    },
  },
  centerContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    position: 'relative',
    minHeight: '400px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Form styling
export const commonFormStyles = (theme: Theme) => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '400px',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
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
    width: '100%',
  },
});

// DogCard styling
export const dogCardStyles = (theme: Theme) => ({
  cardContainer: {
    position: 'relative',
    height: 300,
    width: 250,
    maxWidth: 300,
    flexGrow: 1,
    overflow: 'hidden',
    boxShadow: theme.shadows[5],
    backgroundColor: theme.palette.primary.main,
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.03)',
    },
    '&:hover .cardMedia': {
      transform: 'translateY(-15px) scale(1.1)',
      objectPosition: 'center',
    },
    '&:hover .cardContent': {
      transform: 'translateY(-100%)',
      top: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: '300px',
    },
  },
  cardMedia: {
    maxWidth: 300,
    minWidth: 250,
    minHeight: 200,
    maxHeight: 300,
    height: 300,
    objectFit: 'cover',
    objectPosition: 'center',
    transition: 'transform 0.3s ease, height 0.3s ease',
    borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
  },
  cardContent: {
    color: theme.palette.common.white,
    position: 'absolute',
    top: '255px',
    left: 0,
    right: 0,
    backgroundColor: alpha(theme.palette.primary.light, 0.7),
    padding: theme.spacing(2),
    transition: 'transform 0.3s ease, top 0.3s ease',
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
      color: theme.palette.secondary.light,
    },
    '&:hover .favoriteIcon': {
      transform: 'scale(1.25)',
      color: theme.palette.primary.main,
    },
  },
  favoritedCard: {
    boxShadow: `0 0 10px 3px ${theme.palette.secondary.light}`,
    transform: 'scale(1.03)',
    '& .cardContent': {
      transform: 'translateY(-100%)',
      top: '100%',
    },
    '& .cardMedia': {
      transform: 'translateY(-15px) scale(1.1)',
    },
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

export const searchPageStyles = (theme: Theme) => ({
  filterSortBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(3),
    gap: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap',
      alignItems: 'center',
    },
  },
  paginationBox: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      gap: theme.spacing(2),
    },
  },
});

export const favoritesPageStyles = (theme: Theme) => ({
  noFavoritesText: {
    textAlign: 'center',
    color: theme.palette.text.primary,
    marginTop: theme.spacing(3),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '50%',
    alignSelf: 'center',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: theme.spacing(2),
      width: '80%',
    },
  },
});

export const matchPageStyles = (theme: Theme) => ({
  buttonContainer: {
    display: 'flex',
    minWidth: 'max-content',
    justifyContent: 'center',
    marginTop: theme.spacing(4),
  },
});
