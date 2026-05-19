import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

export default function RoleRoute({ role, redirectTo }) {
  const { user } = useAuth();

  if (user?.type !== role) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}
