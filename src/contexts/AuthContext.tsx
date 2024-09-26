import axios from 'axios';
import { createContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextProps {
  user: { name: string; email: string } | null;
  login: (name: string, email: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to check if user is authenticated by hitting a protected API endpoint
  const checkAuthentication = async () => {
    try {
      // Make a request to a protected endpoint to check if the user is authenticated
      await axios.get(
        'https://frontend-take-home-service.fetch.com/dogs/search',
        {
          withCredentials: true,
        }
      );
      setIsAuthenticated(true); // Set authentication on success
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false); // And also on failure
    }
  };

  // Check authentication status on mount
  useEffect(() => {
    checkAuthentication();
  }, []);

  const login = async (name: string, email: string) => {
    try {
      await axios.post(
        'https://frontend-take-home-service.fetch.com/auth/login',
        { name, email },
        { withCredentials: true } // Cookies get sent with the request
      );

      // Set user data after successful login
      setUser({ name, email });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  // Logging out invalidates the cookie
  const logout = async () => {
    try {
      await axios.post(
        'https://frontend-take-home-service.fetch.com/auth/logout',
        {},
        {
          withCredentials: true, // Ensure the auth cookie is included
        }
      );
      setUser(null); // Clear user data after successful logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
