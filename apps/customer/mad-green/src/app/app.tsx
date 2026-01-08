// Uncomment this line to use CSS modules
// import styles from './app.module.css';
import {
  ThemeProvider,
  CssBaseline,
  Button,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
} from '@mui/material';
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
          <Card sx={{ mb: 2, maxWidth: 345 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Fresh & Modern
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                adjective
              </Typography>
              <Typography variant="body2">
                New and interesting; innovative.
              </Typography>
            </CardContent>
          </Card>
          <Button variant="contained" color="secondary">
            Modern Action
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
