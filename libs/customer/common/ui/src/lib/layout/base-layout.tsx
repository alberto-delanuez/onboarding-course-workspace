import { Outlet, useNavigate } from 'react-router-dom';
import { Navigation } from '../navigation/navigation';

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
      <Outlet />
    </>
  );
};
