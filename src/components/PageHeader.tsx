import { AppBar, Toolbar, Typography, Box, useTheme } from '@mui/material';
import { useAuth } from '../hooks';
import LogoutButton from './LogoutButton'; // Import the LogoutButton component

const PageHeader: React.FC = () => {
  const theme = useTheme();
  const { user } = useAuth();

  return (
    <AppBar>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* App Name or Logo */}
        <Typography variant="h6" component="div">
          Fetch2Match
        </Typography>

        {/* User Name and Logout Button */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {user && (
            <Typography variant="body1" sx={{ marginRight: theme.spacing(2) }}>
              {user.name}
            </Typography>
          )}
          <LogoutButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default PageHeader;
