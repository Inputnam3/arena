
import { Navigate, Outlet } from 'react-router-dom';

interface AuthGuardProps {
  allowedProfiles: string[];
}

const AuthGuard = ({ allowedProfiles }: AuthGuardProps) => {
  const userProfile = localStorage.getItem('userProfile');

  if (!userProfile || !allowedProfiles.includes(userProfile)) {
    // Redirect to login if not authenticated or not allowed profile
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
