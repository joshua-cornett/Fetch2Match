// React imports
import { useContext } from 'react';
// Context imports
import { FavoritesContext } from '../contexts';

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  // favorites, addFavorite, removeFavorite, isFavorited
  return context;
};
