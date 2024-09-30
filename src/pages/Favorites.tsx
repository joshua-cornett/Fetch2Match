// React imports
import { useEffect, useState } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import { DogCard, DogPawLoading, PageHeader } from '../components';
import fetchAPI from '../utils/axiosInstance';
import { Box, Grid2, Typography, useTheme } from '@mui/material';
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

const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites(); // Access favorites context
  const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState(true);

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
  }, [favorites]);

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
          <Grid2 container spacing={3} rowSpacing={3} mt={'40px'}>
            {favoriteDogs.length > 0 ? (
              favoriteDogs.map((dog: Dog) => (
                <Grid2 key={dog.id} size={{ xs: 6, sm: 4, md: 3 }}>
                  <DogCard dog={dog} />
                </Grid2>
              ))
            ) : (
              <Typography>No favorite dogs selected yet!</Typography>
            )}
          </Grid2>
        )}
      </Box>
    </>
  );
};

export default FavoritesPage;
