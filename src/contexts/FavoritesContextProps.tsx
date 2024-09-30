// React imports
import { createContext, useState, ReactNode } from 'react';

interface FavoritesContextProps {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorited: (id: string) => boolean;
}

export const FavoritesContext = createContext<
  FavoritesContextProps | undefined
>(undefined);

// Tracks and modifies favorites
export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Handlers ...

  const addFavorite = (id: string) => {
    setFavorites((prev) => [...prev, id]);
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((fav) => fav !== id));
  };

  const isFavorited = (id: string) => favorites.includes(id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorited }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
