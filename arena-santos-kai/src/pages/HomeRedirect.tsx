
import { Navigate } from 'react-router-dom';
import LandingPage from './LandingPage';

const HomeRedirect = () => {
  const userToken = localStorage.getItem('userToken');

  if (userToken) {
    // If user is logged in, redirect to the admin dashboard
    return <Navigate to="/admin" replace />;
  }

  // If not logged in, show the LandingPage
  return <LandingPage />;
};

export default HomeRedirect;
