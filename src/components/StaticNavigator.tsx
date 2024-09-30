// React imports
import { useNavigate } from 'react-router-dom';

// MUI imports
import { Box, Button } from '@mui/material';

interface NavigatorProps {
  to: string;
  text: string;
}

const SimpleNavigator: React.FC<NavigatorProps> = ({ to, text }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/${to}`);
  };

  return (
    <Box>
      <Button variant="light" onClick={handleNavigate}>
        {text}
      </Button>
    </Box>
  );
};

export default SimpleNavigator;
