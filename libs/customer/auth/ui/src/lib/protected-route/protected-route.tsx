import { Navigate, Outlet } from 'react-router-dom';

export interface ProtectedRouteProps {
  redirectPath?: string;
}

export const ProtectedRoute = ({ redirectPath = '/login' }: ProtectedRouteProps) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};
