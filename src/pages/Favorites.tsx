// React imports
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Hood imports
import { useFavorites } from '../hooks/useFavorites';

// Components imports
import {
  DogCard,
  DogPawLoading,
  PageHeader,
  StaticNavigator,
} from '../components';

// API import
import fetchAPI from '../utils/axiosInstance';

// MUI imports
import { Box, Button, Grid2, Typography, useTheme } from '@mui/material';

// Style imports
import { commonBoxStyles } from '../style/styles';

// Interface for Dog details
interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

const Favorites: React.FC = () => {
  const { favorites } = useFavorites(); // Access favorites context
  const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const theme = useTheme();
  const boxStyles = commonBoxStyles(theme);

  // Fetch favorited dogs details based on their IDs
  useEffect(() => {
    if (favorites.length > 0) {
      const fetchFavoriteDogs = async () => {
        setLoading(true);
        try {
          const response = await fetchAPI.post('/dogs', favorites);
          setFavoriteDogs(response.data); // Set the full details of the favorited dogs
        } catch (error) {
          console.error('Error fetching favorite dogs:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchFavoriteDogs();
    } else {
      setFavoriteDogs([]); // Clear the list if there are no favorites
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handler to find a match
  const handleFindMatch = async () => {
    if (favorites.length > 0) {
      try {
        const response = await fetchAPI.post('/dogs/match', favorites); // Send the favorites to the match endpoint
        console.log(response.data);
        const matchedDogId = response.data.match;
        navigate(`/match/${matchedDogId}`); // Redirect to match page with matched dog ID
      } catch (error) {
        console.error('Error matching dog:', error);
      }
    }
  };

  return (
    <>
      <PageHeader />
      {/* Main page attention grabber */}
      <Box sx={boxStyles.fullHeightContainer}>
        <Typography variant="h2" color={theme.palette.secondary.light}>
          Your Favorite Dogs
        </Typography>
        <Typography variant="body1" color={theme.palette.text.secondary}>
          Here are your favorite dogs!
        </Typography>

        {/* Loading Animation and Favorited Dogs */}
        {loading ? (
          <DogPawLoading />
        ) : (
          <Grid2 container spacing={3} mt={'40px'} justifyContent={'center'}>
            {favoriteDogs.length > 0 ? (
              favoriteDogs.map((dog: Dog) => (
                <Grid2 key={dog.id} size={{ xs: 6, sm: 4, md: 3 }}>
                  <DogCard dog={dog} />
                </Grid2>
              ))
            ) : (
              <Typography variant="h3">
                No favorite dogs selected yet!
              </Typography>
            )}
          </Grid2>
        )}
        {/* Buttons */}
        <Box
          sx={{
            display: 'flex',
            width: '50%',
            alignSelf: 'center',
            justifyContent: 'space-between',
            marginTop: theme.spacing(4),
          }}
        >
          {/* Back to Search Button */}
          <StaticNavigator to="search" text="Back to Search" />

          {/* Match Button */}
          <Button
            variant="light"
            onClick={handleFindMatch}
            disabled={favorites.length === 0}
          >
            Find a Match
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Favorites;
