// MUI imports
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  useTheme,
  IconButton,
  Box,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // Import heart icon
import FavoriteIcon from '@mui/icons-material/Favorite'; // Filled heart for the "favorited" state

// Styling imports
import { dogCardStyles } from '../style/styles';

// Context imports
import { useFavorites } from '../hooks';

// Type definitions ...

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface DogCardProps {
  dog: Dog;
}

// DogCard Component
const DogCard: React.FC<DogCardProps> = ({ dog }) => {
  const theme = useTheme();
  const styles = dogCardStyles(theme);

  const { addFavorite, removeFavorite, isFavorited } = useFavorites();
  const favorited = isFavorited(dog.id);

  // Toggle favorite
  const handleFavoriteClick = () => {
    if (favorited) {
      removeFavorite(dog.id);
    } else {
      addFavorite(dog.id);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 2, // space between cards
      }}
    >
      <Card
        sx={{
          ...styles.cardContainer,
          ...(favorited
            ? styles.favoritedCard
            : styles.cardContainerHoveredNotFavorited),
        }}
      >
        {/* Dog image */}
        <CardMedia
          className="cardMedia"
          component="img"
          sx={styles.cardMedia}
          image={dog.img}
          alt={dog.name}
        />

        {/* Dog details */}
        <CardContent className="cardContent" sx={styles.cardContent}>
          <Typography gutterBottom variant="h5" component="div">
            {dog.name}
          </Typography>
          <Typography variant="body2">Breed: {dog.breed}</Typography>
          <Typography variant="body2">Age: {dog.age} years</Typography>
          <Typography variant="body2">Location: {dog.zip_code}</Typography>
        </CardContent>

        {/* Favorite button */}
        <IconButton
          sx={{
            ...styles.heartButton,
          }}
          className={!isFavorited ? 'heartButtonNotFavorited' : ''} // Animation when not favorited (entices user to click)
          onClick={handleFavoriteClick}
        >
          {favorited ? (
            <FavoriteIcon className="favoritedIcon" sx={styles.favoritedIcon} /> // Filled heart when favorited
          ) : (
            <FavoriteBorderIcon
              className="favoriteIcon"
              sx={styles.favoriteIcon}
            /> // Outline heart before favorited
          )}
        </IconButton>
      </Card>
    </Box>
  );
};

export default DogCard;
