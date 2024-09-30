// React imports
import { useEffect, useState } from 'react';

// API imports
import fetchAPI from '../utils/axiosInstance';

// Component imports
import {
  PageHeader,
  DogCard,
  SortToggle,
  BreedFilter,
  DogPawLoading,
  StaticNavigator,
} from '../components';

// MUI imports
import { Box, Typography, useTheme, Grid2, Button } from '@mui/material';

// Custom styling imports
import { commonBoxStyles, searchPageStyles } from '../style/styles';

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
  const searchStyles = searchPageStyles(theme);

  //dogs state
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [dogs, setDogs] = useState<Dog[]>([]);

  //loading state
  const [loading, setLoading] = useState(true);

  //pagination states
  const [nextPageQuery, setNextPageQuery] = useState<string | null>(null);
  const [prevPageQuery, setPrevPageQuery] = useState<string | null>(null);
  const [pageSize] = useState<number>(8);

  //sorting state
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Fetch list of breeds
  const fetchBreeds = async () => {
    try {
      const response = await fetchAPI.get('/dogs/breeds');
      setBreeds(response.data);
    } catch (error) {
      console.error('Failed to fetch breeds:', error);
    }
  };

  // Fetch dogs (with or without query)
  const fetchDogs = async (
    query?: string,
    breedsFilter?: string[],
    sortOrder?: string
  ) => {
    setLoading(true);
    setDogs([]); // Clear the dog list to prevent showing old data

    try {
      // Fetch dog IDs
      const searchResponse = await fetchAPI.get('/dogs/search', {
        params: {
          size: pageSize,
          ...(query && { from: query }), // Use pagination query if available
          ...(breedsFilter?.length ? { breeds: breedsFilter } : {}),
          sort: `breed:${sortOrder}`, // Sorting order
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
    fetchDogs(undefined, [], sortOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** HANDLERS */

  // Breed Filtering and Sorting ...

  // Handle breed selection change
  const handleBreedChange = (_event: React.SyntheticEvent, value: string[]) => {
    setSelectedBreeds(value);
    fetchDogs(undefined, value, sortOrder);
  };

  // Handle sort order change
  const handleSortChange = (newSortOrder: 'asc' | 'desc') => {
    setSortOrder(newSortOrder);
    fetchDogs(undefined, selectedBreeds, newSortOrder);
  };

  // Pagination ...

  // Handler for next page
  const handleNextPage = () => {
    if (nextPageQuery) {
      fetchDogs(nextPageQuery, selectedBreeds, sortOrder);
    }
  };

  // Handler for previous page
  const handlePrevPage = () => {
    if (prevPageQuery) {
      fetchDogs(prevPageQuery, selectedBreeds, sortOrder);
    }
  };

  return (
    <>
      <PageHeader />
      <Box sx={boxStyles.fullHeightContainer}>
        {/* Main page attention grabber */}
        <Box sx={boxStyles.headerBox}>
          <Typography variant="h2" color={theme.palette.secondary.light}>
            Search for Dogs
          </Typography>
          {/* Description of function for user */}
          <Typography variant="body1" color={theme.palette.text.secondary}>
            Explore dogs available for adoption.
          </Typography>
        </Box>

        {/* Filter, Sort, and View Favorites options */}
        <Box sx={searchStyles.filterSortBox}>
          <BreedFilter
            breeds={breeds}
            selectedBreeds={selectedBreeds}
            onBreedChange={handleBreedChange}
          />
          <SortToggle sortOrder={sortOrder} onSortChange={handleSortChange} />
          <StaticNavigator to="favorites" text="View Favorites" />
        </Box>
        {/* Loading Animation and Dogs */}
        <Box sx={boxStyles.gridContainer}>
          {loading ? (
            <DogPawLoading />
          ) : (
            <Grid2 container spacing={3}>
              {dogs.map((dog: Dog) => (
                <Grid2 key={dog.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <DogCard dog={dog} />
                </Grid2>
              ))}
            </Grid2>
          )}
        </Box>

        {/* Pagination Buttons */}
        <Box sx={searchStyles.paginationBox}>
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
