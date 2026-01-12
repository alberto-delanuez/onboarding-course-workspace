import { Outlet, useNavigate } from 'react-router-dom';
import { Navigation } from '../navigation/navigation';
import { Box } from '@mui/material';

export interface BaseLayoutProps {
  title: string;
  currentLocale: string;
  onLocaleChange: (locale: string) => void;
}

export const BaseLayout = ({ title, currentLocale, onLocaleChange }: BaseLayoutProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <Navigation 
        title={title} 
        onLogout={handleLogout} 
        currentLocale={currentLocale}
        onLocaleChange={onLocaleChange}
      />
      <Box sx={{ padding: 2, marginY: 'auto' }}>
        <Outlet />
      </Box>
    </>
  );
};
