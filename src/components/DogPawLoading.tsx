import { Box, keyframes } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';

const oscillatePaws = keyframes`
  50% { transform: translateY(-50px)}
`;

const DogPawLoading = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3,
      }}
    >
      {[...Array(4)].map((_, index) => (
        <PetsIcon
          key={index}
          fontSize="large"
          sx={{
            animation: `${oscillatePaws} .4s infinite`,
            animationDelay: `${index * 0.1}s`,
            color: 'white',
          }}
        />
      ))}
    </Box>
  );
};

export default DogPawLoading;
