import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../components/context-api/user-context/UserContext';

const ProtectedRoute = () => {
  const { user } = useContext(UserContext);
  const token = localStorage.getItem('token');

  // If no user or no token, redirect to login
  if (!user || !token) {
    return <Navigate to="/login" replace />
  }

  // If authenticated, render the requested page
  return <Outlet />;
};

export default ProtectedRoute;
