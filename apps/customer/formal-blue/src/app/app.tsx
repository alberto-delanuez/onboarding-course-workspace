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

export function App() {
  return (
    <ThemeProvider theme={blueTheme}>
      <CssBaseline />
      <Container>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Formal Blue Application
          </Typography>
          <Button variant="contained" color="primary">
            Professional Action
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
