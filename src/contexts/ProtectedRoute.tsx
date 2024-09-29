import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import { DogPawLoading } from '../components';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Display the LoadingBar component while the authentication check is in progress
  if (isLoading) {
    return <DogPawLoading />;
  }

  // If user is not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Render the protected component if user is authenticated
  return children;
};

export default ProtectedRoute;
