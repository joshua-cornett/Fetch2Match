// React imports
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

// Hook imports
import { useAuth } from '../hooks';

// MUI imports
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';

// Style imports
import { commonFormStyles, commonBoxStyles } from '../style/styles';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const formStyles = commonFormStyles(theme);
  const boxStyles = commonBoxStyles(theme);

  // Redirect to search page if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/search" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(name, email);
      navigate('/search');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <Box sx={boxStyles.centerContent}>
      <Typography variant="h4">Login</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={formStyles.formContainer}
      >
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={formStyles.textField}
          required
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={formStyles.textField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={formStyles.submitButton}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
