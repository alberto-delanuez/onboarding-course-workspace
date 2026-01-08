// Uncomment this line to use CSS modules
// import styles from './app.module.css';
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Typography,
  Box
} from '@mui/material';
import { LoginContainer } from '@onboarding-course/customer-auth-ui';
import { Link } from 'react-router-dom';
import { greenTheme } from '@onboarding-course/customer-themes-green';

export function App() {
  return (
    <ThemeProvider theme={greenTheme}>
      <CssBaseline />
      <Container>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom color="primary">
            Mad Green Application
          </Typography>
          <LoginContainer />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
