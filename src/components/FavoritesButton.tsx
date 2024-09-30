import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FavoritesButton = () => {
  const navigate = useNavigate();

  return (
    <Button variant="contained" onClick={() => navigate('/favorites')}>
      View Favorites
    </Button>
  );
};

export default FavoritesButton;
