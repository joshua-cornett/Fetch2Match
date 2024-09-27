// React imports
import { useEffect, useState } from 'react';

// API imports
import fetchAPI from '../utils/axiosInstance';

// Component imports
import { PageHeader, DogCard } from '../components';

// MUI imports
import { Box, Typography, useTheme, Grid2 } from '@mui/material';

// Custom styling imports
import { commonBoxStyles } from '../style/styles';

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

const Search = () => {
  const theme = useTheme();
  const boxStyles = commonBoxStyles(theme);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Dogs on page load
  useEffect(() => {
    const fetchDogs = async () => {
      try {
        // Fetch dogs from the /dogs/search endpoint
        const response = await fetchAPI.get('/dogs/search', {
          params: {
            size: 25 /** @TODO - Temporary limit. Will need to remove for pagination implementation. */,
          },
        });

        // Assuming the API returns dog IDs, fetch full details using /dogs endpoint
        const dogIds = response.data.resultIds;
        if (dogIds.length > 0) {
          const dogsResponse = await fetchAPI.post('/dogs', dogIds);
          setDogs(dogsResponse.data);
        }
      } catch (error) {
        console.error('Failed to fetch dogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDogs();
  }, []);

  if (loading) {
    return <Typography variant="h4">Loading...</Typography>;
  }

  return (
    <>
      <PageHeader />
      <Box sx={boxStyles.fullHeightContainer}>
        {/* Main page attention grabber */}
        <Typography variant="h2" color={theme.palette.secondary.light}>
          Search for Dogs
        </Typography>
        {/* Description of function for user */}
        <Typography variant="body1" color={theme.palette.text.secondary}>
          Explore dogs available for adoption.
        </Typography>
        {/* Actual Dog content */}
        <Grid2 container spacing={3} rowSpacing={3}>
          {dogs.map((dog) => (
            <Grid2 key={dog.id} size={{ xs: 6, sm: 4, md: 3 }}>
              <DogCard dog={dog} />
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </>
  );
};

export default Search;
