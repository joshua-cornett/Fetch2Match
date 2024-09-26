import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';

// Custom reuseable styles
import { commonFormStyles, commonBoxStyles } from '../style/styles';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const formStyles = commonFormStyles(theme);
  const boxStyles = commonBoxStyles(theme);

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
          sx={{
            ...formStyles.textField,
            marginBottom: theme.spacing(3),
          }}
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
