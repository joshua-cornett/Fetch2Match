// React imports
import { useNavigate } from 'react-router-dom';

// Hook imports
import { useAuth } from '../hooks';

// MUI Imports
import { Button } from '@mui/material';

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/'); // Return to login
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
