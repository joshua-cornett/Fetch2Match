import { useAuth } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <Button variant="logout" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
