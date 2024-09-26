import { PageHeader } from '../components';
import { Box, Typography, useTheme } from '@mui/material';
import { commonBoxStyles } from '../style/styles';

const Search = () => {
  const theme = useTheme();
  const boxStyles = commonBoxStyles(theme);

  return (
    <>
      <PageHeader />
      <Box sx={boxStyles.fullHeightContainer}>
        <Typography variant="h2">Search for Dogs</Typography>
        <Typography variant="body1">
          Explore dogs available for adoption.
        </Typography>
      </Box>
    </>
  );
};

export default Search;
