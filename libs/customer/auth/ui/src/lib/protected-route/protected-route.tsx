import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useVerifyQuery } from '../queries/use-verify-query';

export interface ProtectedRouteProps {
  redirectPath?: string;
}

export const ProtectedRoute = ({ redirectPath = '/login' }: ProtectedRouteProps) => {
  const location = useLocation();
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const token = localStorage.getItem('token');
  const { isLoading, isSuccess, isError, refetch } = useVerifyQuery(token);

  useEffect(() => {
    refetch();
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    if (!token) {
      setAuthorized(false);
      return;
    }
    if (isLoading) {
      setAuthorized(null);
      return;
    }
    if (isSuccess) {
      setAuthorized(true);
      return;
    }
    if (isError) {
      localStorage.removeItem('token');
      setAuthorized(false);
    }
  }, [token, isLoading, isSuccess, isError]);

  if (authorized === null) {
    return null;
  }

  if (!authorized) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return <Outlet />;
};
