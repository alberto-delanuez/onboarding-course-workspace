// Uncomment this line to use CSS modules
// import styles from './app.module.css';
import {
  ThemeProvider,
  CssBaseline,
  Button,
  Container,
  Typography,
  Box,
} from '@mui/material';
import { blueTheme } from '@onboarding-course/customer-themes-blue';
import { LoginContainer } from '@onboarding-course/customer-auth-ui';
import { Link } from 'react-router-dom';

export function App() {
  return (
    <ThemeProvider theme={blueTheme}>
      <CssBaseline />
      <Container>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Formal Blue Application
          </Typography>
          <LoginContainer />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
