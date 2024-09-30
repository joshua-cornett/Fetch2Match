// React imports
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// API import
import fetchAPI from '../utils/axiosInstance';

// Component imports
import { DogCard, DogPawLoading, PageHeader } from '../components';

// MUI imports
import { Box, Typography, useTheme } from '@mui/material';

// Custom styling imports
import { commonBoxStyles } from '../style/styles';
import { StaticNavigator } from '../components';

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

const Match = () => {
  const theme = useTheme();
  const boxStyles = commonBoxStyles(theme);
  const { matchedDogId } = useParams();
  console.log(matchedDogId);
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch matched dog details
  const fetchMatchedDog = async () => {
    try {
      const response = await fetchAPI.post('/dogs', [matchedDogId]);
      setMatchedDog(response.data[0]);
    } catch (error) {
      console.error('Failed to fetch matched dog:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatchedDog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchedDogId]);

  return (
    <>
      <PageHeader />
      <Box sx={boxStyles.fullHeightContainer}>
        <Typography variant="h2" color={theme.palette.secondary.light}>
          Your Matched Dog
        </Typography>

        {loading ? (
          <DogPawLoading />
        ) : (
          matchedDog && (
            <Box sx={{ marginTop: theme.spacing(4) }}>
              <DogCard dog={matchedDog} />
            </Box>
          )
        )}
        {/* Back to Search Button */}
        <StaticNavigator to="search" text="Back to Search" />
      </Box>
    </>
  );
};

export default Match;
