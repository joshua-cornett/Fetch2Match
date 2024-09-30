// Hook imports
import { useAuth } from '../hooks';

// Component imports
import { LogoutButton } from '.';

// MUI imports
import { AppBar, Toolbar, Typography, Box, useTheme } from '@mui/material';

const PageHeader: React.FC = () => {
  const theme = useTheme();
  const { user } = useAuth();

  return (
    <AppBar>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* App Name */}
        {/** @TODO - incorporate logo */}
        <Typography variant="h6" component="div">
          Fetch2Match
        </Typography>

        {/* User display and Logout Button */}
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
