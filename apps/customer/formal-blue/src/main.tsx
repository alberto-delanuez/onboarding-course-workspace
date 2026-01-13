import { StrictMode, useState } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { blueTheme } from '@onboarding-course/customer-themes-blue';
import { LoginContainer, ProtectedRoute, RegisterContainer } from '@onboarding-course/customer-auth-ui';
import { BaseLayout, ErrorBoundary } from '@onboarding-course/customer-common-ui';
import Dashboard from './app/dashboard';
import { IntlProvider  } from 'react-intl';
import messages from './i18n/translations.json';
import Profile from './app/profile';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CustomerAppBuilder } from '@onboarding-course/customer-common-utils';

const appConfig = new CustomerAppBuilder()
  .withTitle('Formal Blue')
  .withApiUrl('https://dummyjson.com')
  .withDefaultLocale('en')
  .withSocialLogin()
  .withAuthModule()
  .withProfileModule()
  .build();

// Type assertion for messages to ensure it matches Record<string, string>
const messagesMap: Record<string, Record<string, string>> = messages;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const App = () => {
  const [locale, setLocale] = useState(localStorage.getItem('locale') || appConfig.defaultLocale);

  const handleLocaleChange = (newLocale: string) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  const currentMessages = messagesMap[locale];

  return (
    <IntlProvider locale={locale} messages={currentMessages}>
      <ThemeProvider theme={blueTheme}>
        <CssBaseline />
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginContainer enableLogin={appConfig.enableLogin} enableSocialLogin={appConfig.enableSocialLogin} enableOTP={appConfig.enableOTP} />} />
              <Route path="/register" element={<RegisterContainer />} />
              
              <Route element={<ProtectedRoute />}>
                <Route element={<BaseLayout title={appConfig.title} currentLocale={locale} onLocaleChange={handleLocaleChange} />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>
              </Route>

              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </BrowserRouter>
          </QueryClientProvider>  
        </ErrorBoundary>
      </ThemeProvider>
    </IntlProvider>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
