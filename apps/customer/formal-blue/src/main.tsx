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
import { DIContainer } from '@onboarding-course/customer-common-di';
import { ProfileRepositoryToken, GetProfileUseCaseToken, UpdateProfileUseCaseToken, GetProfileUseCase, UpdateProfileUseCase } from '@onboarding-course/customer-profile-application';
import { ProfileHttpRepository } from '@onboarding-course/customer-profile-infrastructure';
import { AuthRepositoryToken, LoginUseCaseToken, RegisterUseCaseToken, LoginUseCase, RegisterUseCase, VerifyUseCase, VerifyUseCaseToken } from '@onboarding-course/customer-auth-application';
import { AuthHttpRepository } from '@onboarding-course/customer-auth-infrastructure';

const appConfig = {
  title: 'Formal Blue',
  apiUrl: 'https://dummyjson.com',
  defaultLocale: 'en',
};

// Initialize DI
const profileRepo = new ProfileHttpRepository(appConfig.apiUrl);
DIContainer.set(ProfileRepositoryToken, profileRepo);
DIContainer.set(GetProfileUseCaseToken, new GetProfileUseCase(profileRepo));
DIContainer.set(UpdateProfileUseCaseToken, new UpdateProfileUseCase(profileRepo));

const authRepo = new AuthHttpRepository(appConfig.apiUrl);
DIContainer.set(AuthRepositoryToken, authRepo);
DIContainer.set(LoginUseCaseToken, new LoginUseCase(authRepo));
DIContainer.set(RegisterUseCaseToken, new RegisterUseCase(authRepo));
DIContainer.set(VerifyUseCaseToken, new VerifyUseCase(authRepo));

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
              <Route path="/login" element={<LoginContainer />} />
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
