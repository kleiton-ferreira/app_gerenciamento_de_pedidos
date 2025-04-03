//Frontend/src/components/PrivateRoute.jsx

import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../services/authService';

const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
