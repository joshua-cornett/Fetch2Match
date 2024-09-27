// MUI imports
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  useTheme,
  IconButton,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // Import heart icon
import FavoriteIcon from '@mui/icons-material/Favorite'; // Filled heart for the "favorited" state

// Styling imports
import { dogCardStyles } from '../style/styles';
import { useState } from 'react';

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
  onFavorite?: (id: string) => void; // Favorite handler
}

// DogCard Component
const DogCard: React.FC<DogCardProps> = ({ dog, onFavorite }) => {
  const theme = useTheme();
  const styles = dogCardStyles(theme);

  const [isFavorited, setIsFavorited] = useState(false);

  // Toggle favorite
  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
    onFavorite?.(dog.id); // Call the favorite handler if provided
  };

  return (
    <Card
      sx={{
        ...styles.cardContainer,
        ...(isFavorited
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
        {isFavorited ? (
          <FavoriteIcon className="favoritedIcon" sx={styles.favoritedIcon} /> // Filled heart when favorited
        ) : (
          <FavoriteBorderIcon
            className="favoriteIcon"
            sx={styles.favoriteIcon}
          /> // Outline heart before favorited
        )}
      </IconButton>
    </Card>
  );
};

export default DogCard;
