// React imports
import { createRoot } from 'react-dom/client';

// Context imports
import { AuthProvider } from './contexts';

// Style imports
import theme from './style/theme.ts';

// MUI imports
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// App import
import App from './App.tsx';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AuthProvider>
      <App />
    </AuthProvider>
  </ThemeProvider>
);
