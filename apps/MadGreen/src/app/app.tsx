// Uncomment this line to use CSS modules
// import styles from './app.module.css';

import { Box } from '@mui/material';
import { Route, Routes, Link } from 'react-router-dom';
import { ProfileFeature } from '@onboarding-course/feature-profile';

export function App() {
  return (
    <Box component="section" sx={{ p: 2, border: '1px solid green' }}>

      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
      <ProfileFeature /> 
    </Box>
    
  );
}

export default App;
