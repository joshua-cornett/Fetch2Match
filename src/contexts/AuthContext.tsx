import fetchAPI from '../utils/axiosInstance'; // Import the axios setup
import { createContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextProps {
  user: { name: string; email: string } | null;
  login: (name: string, email: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    // Retrieve user from localStorage if available
    () => {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    }
  );

  const [isAuthenticated, setIsAuthenticated] = useState(!!user); // Set based on user presence
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // Function to check if the user is authenticated by hitting a protected endpoint
  const checkAuthentication = async () => {
    try {
      // Make a request to a protected endpoint to check if the user is authenticated
      const response = await fetchAPI.get('/dogs/search', {
        withCredentials: true,
      });
      // If the request succeeds, the user is authenticated
      if (response.status === 200) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('User is not authenticated:', error);
      setIsAuthenticated(false); // If the request fails, the user is not authenticated
    } finally {
      setIsLoading(false); // End the loading state
    }
  };

  // Check authentication status on mount
  useEffect(() => {
    checkAuthentication();
  }, []);

  const login = async (name: string, email: string) => {
    try {
      await fetchAPI.post('/auth/login', { name, email });
      const userData = { name, email };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetchAPI.post('/auth/logout', {});
      setUser(null);
      localStorage.removeItem('user');
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
