// React imports
import { useEffect, useState } from 'react';

// API imports
import fetchAPI from '../utils/axiosInstance';

// Component imports
import { PageHeader, DogCard, DogPawLoading } from '../components';

// MUI imports
import {
  Box,
  Typography,
  useTheme,
  Grid2,
  Button,
  Autocomplete,
  TextField,
  Chip,
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
  // Breeds
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [dogs, setDogs] = useState<Dog[]>([]);
  //loading state
  const [loading, setLoading] = useState(true);
  //pagination states
  const [nextPageQuery, setNextPageQuery] = useState<string | null>(null);
  const [prevPageQuery, setPrevPageQuery] = useState<string | null>(null);
  const [pageSize] = useState<number>(8);

  // Fetch list of breeds
  const fetchBreeds = async () => {
    try {
      const response = await fetchAPI.get('/dogs/breeds');
      setBreeds(response.data);
    } catch (error) {
      console.error('Failed to fetch breeds:', error);
    }
  };

  // Fetch dogs with optional query (pagination or filters)
  const fetchDogs = async (query?: string, breedsFilter?: string[]) => {
    setLoading(true);
    try {
      // Fetch dog IDs
      const searchResponse = await fetchAPI.get('/dogs/search', {
        params: {
          size: pageSize,
          ...(query && { from: query }), // Use pagination query if available
          ...(breedsFilter?.length ? { breeds: breedsFilter } : {}),
          sort: 'breed:asc',
        },
      });

      const dogIds = searchResponse.data.resultIds;

      if (dogIds.length > 0) {
        // Fetch full dog details with retrieved IDs
        const dogsResponse = await fetchAPI.post('/dogs', dogIds);
        setDogs(dogsResponse.data);

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
      setLoading(false);
    }
  };

  // Initial data fetching
  useEffect(() => {
    fetchBreeds();
    fetchDogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** HANDLERS */

  // Handle breed selection change
  const handleBreedChange = (_event: React.SyntheticEvent, value: string[]) => {
    setSelectedBreeds(value);
    fetchDogs(undefined, value); // also resets pagination
  };

  // Handler for next page
  const handleNextPage = () => {
    if (nextPageQuery) {
      fetchDogs(nextPageQuery, selectedBreeds);
    }
  };

  // Handler for previous page
  const handlePrevPage = () => {
    if (prevPageQuery) {
      fetchDogs(prevPageQuery, selectedBreeds);
    }
  };

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
        {/* Breed filter */}
        <Autocomplete
          multiple
          options={breeds}
          getOptionLabel={(option) => option}
          value={selectedBreeds}
          onChange={handleBreedChange}
          renderTags={(value: string[], getTagProps) => (
            <div style={{ width: '100%' }}>
              {value.map((option: string, index: number) => (
                <Chip label={option} {...getTagProps({ index })} />
              ))}
            </div>
          )}
          renderInput={(params) => (
            <TextField
              sx={{
                paddingTop: 1,
                // Make filter text and outlines white
                '& .MuiInputLabel-root': {
                  color: 'white',
                  fontSize: 24,
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  svg: {
                    color: 'white',
                  },
                },
                span: {
                  fontSize: 20,
                  color: 'white',
                },
                input: {
                  '&::placeholder': {
                    opacity: 1,
                    color: theme.palette.secondary.light,
                  },
                },
                '& .MuiAutocomplete-tag': {
                  color: 'white',
                },
              }}
              {...params}
              label="Filter by Breed"
              placeholder="search and select breeds..."
            />
          )}
          sx={{
            marginBottom: theme.spacing(2),
            minWidth: 300,
            maxWidth: 'max-content',
          }}
        />

        <Box
          sx={{
            position: 'relative',
            minHeight: '400px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {loading ? (
            <DogPawLoading />
          ) : (
            <Grid2 container spacing={3} rowSpacing={3}>
              {dogs.map((dog: Dog) => (
                <Grid2 key={dog.id} size={{ xs: 6, sm: 4, md: 3 }}>
                  <DogCard dog={dog} />
                </Grid2>
              ))}
            </Grid2>
          )}
        </Box>
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
            variant="light"
            onClick={handlePrevPage}
            disabled={!prevPageQuery || loading}
          >
            Previous
          </Button>
          <Button
            variant="light"
            onClick={handleNextPage}
            disabled={!nextPageQuery || loading}
          >
            Next
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Search;
