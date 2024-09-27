import { Box, LinearProgress } from '@mui/material';

// A loading bar for when user is logging in, out, or performing a search
const LoadingBar = () => {
  return (
    <Box
      sx={{
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    >
      <LinearProgress />
    </Box>
  );
};

export default LoadingBar;
