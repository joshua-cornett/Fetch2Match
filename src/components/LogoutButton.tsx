import { useAuth } from '../hooks';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      /** @TODO - explicit check for successful response */
      navigate('/'); // Redirect to search page on success
    } catch (error) {
      /** @TODO - Implement "Failed Logout" display */
      /** @CONSIDER - Implement Error Boundary */
      console.error('Logout error:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      <Button
        onClick={handleLogout}
        variant="contained"
        color="primary"
        fullWidth
      >
        Logout
      </Button>
    </Box>
  );
};

export default LogoutButton;
