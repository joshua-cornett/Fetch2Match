// React imports
import { useEffect, useState } from 'react';

// API imports
import fetchAPI from '../utils/axiosInstance';

// Component imports
import { PageHeader, DogCard } from '../components';

// MUI imports
import {
  Box,
  Typography,
  useTheme,
  CircularProgress,
  Grid2,
  Button,
} from '@mui/material';

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
  //style context
  const theme = useTheme();
  const boxStyles = commonBoxStyles(theme);
  //dogs state
  const [dogs, setDogs] = useState<Dog[]>([]);
  //loading state
  const [loading, setLoading] = useState(true);
  //pagination states
  const [nextPageQuery, setNextPageQuery] = useState<string | null>(null);
  const [prevPageQuery, setPrevPageQuery] = useState<string | null>(null);
  const [pageSize] = useState<number>(25);

  // Fetch Dogs based on pagination or filters
  const fetchDogs = async (query?: string) => {
    setLoading(true);
    try {
      // Fetch Dog IDs
      const searchResponse = await fetchAPI.get('/dogs/search', {
        params: {
          size: pageSize,
          ...(query && { from: query }), // Use pagination cursor if provided
          sort: 'breed:asc',
        },
      });

      const dogIds = searchResponse.data.resultIds;

      if (dogIds.length > 0) {
        // Fetch full dog details with retrieved IDs
        const dogsResponse = await fetchAPI.post('/dogs', dogIds);

        setDogs(dogsResponse.data); // Save full dog data in state

        // Extract cursors (does not natively agree with required POST headers)
        const nextCursor = new URLSearchParams(
          searchResponse.data.next.split('?')[1]
        ).get('from');
        const prevCursor = new URLSearchParams(
          searchResponse.data.prev?.split('?')[1]
        ).get('from');

        setNextPageQuery(nextCursor);
        setPrevPageQuery(prevCursor);
      } else {
        console.log(
          'No dogs found'
        ); /** @TODO - Create meaningful alert for user */
        setDogs([]);
      }
    } catch (error) {
      console.error('Error fetching dogs:', error);
    } finally {
      setLoading(false); // Set loading state to false after fetching
    }
  };

  useEffect(() => {
    console.log('init search');
    fetchDogs(); // Fetch initial data on component mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handler for next page
  const handleNextPage = () => {
    if (nextPageQuery) {
      fetchDogs(nextPageQuery);
    }
  };

  // Handler for previous page
  const handlePrevPage = () => {
    if (prevPageQuery) {
      fetchDogs(prevPageQuery);
    }
  };

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
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {/* Actual Dog content */}
            <Grid2 container spacing={3} rowSpacing={3}>
              {dogs.map((dog: Dog) => (
                <Grid2 key={dog.id} size={{ xs: 6, sm: 4, md: 3 }}>
                  <DogCard dog={dog} />
                </Grid2>
              ))}
            </Grid2>
            {/* Pagination buttons */}
            {/** @TODO - Abstract away styling into another box style */}
            {/** @CONSIDER - Arrow button cursors on sides instead to simulate a carousel */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: theme.spacing(4),
              }}
            >
              <Button
                variant="contained"
                onClick={handlePrevPage}
                disabled={!prevPageQuery}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                onClick={handleNextPage}
                disabled={!nextPageQuery}
              >
                Next
              </Button>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default Search;
