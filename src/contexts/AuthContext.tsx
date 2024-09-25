import axios from 'axios';
import { createContext, useState, ReactNode } from 'react';

interface AuthContextProps {
  user: { name: string; email: string } | null;
  login: (name: string, email: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );

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
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
