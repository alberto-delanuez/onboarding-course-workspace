import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { LoginContainer, ProtectedRoute, RegisterContainer } from '@onboarding-course/customer-auth-ui';
import Dashboard from './app/dashboard';
import { BaseLayout } from '@onboarding-course/customer-common-ui';
import { purpleTheme } from '@onboarding-course/customer-themes-purple';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <ThemeProvider theme={purpleTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginContainer apiUrl="https://dummyjson.com/auth/login" />} />
          <Route path="/register" element={<RegisterContainer />} />
          
          <Route element={<ProtectedRoute />}>
            <Route element={<BaseLayout title={import.meta.env.VITE_APP_TITLE} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<div>Profile (Coming Soon)</div>} />
            </Route>
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
