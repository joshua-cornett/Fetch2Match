
// React imports
import { useContext } from 'react';

// Context imports
import { AuthContext } from '../contexts';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
