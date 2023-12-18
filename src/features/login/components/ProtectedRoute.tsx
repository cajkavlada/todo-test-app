import {Outlet} from 'react-router-dom';
import {useAuthRedirect} from '../utils/useAuthRedirect';

export function ProtectedRoute() {
  const isAuthenticated = useAuthRedirect(null, '/login');

  if (!isAuthenticated) {
    return null;
  }

  return <Outlet />;
}
