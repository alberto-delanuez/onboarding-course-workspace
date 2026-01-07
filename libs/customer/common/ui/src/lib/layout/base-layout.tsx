import { Outlet, useNavigate } from 'react-router-dom';
import { Navigation } from '../navigation/navigation';
import { Box } from '@mui/material';

export interface BaseLayoutProps {
  title: string;
}

export const BaseLayout = ({ title }: BaseLayoutProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <Navigation title={title} onLogout={handleLogout} />
      <Box sx={{ padding: 2, marginY: 'auto' }}>
        <Outlet />
      </Box>
    </>
  );
};
