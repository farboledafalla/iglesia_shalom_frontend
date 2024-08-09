import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import PropTypes from 'prop-types';

export const ProtectedRoute = ({ children }) => {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [loading, setLoading] = useState(true);
   // Ubicación actual
   const location = useLocation();

   useEffect(() => {
      const checkAuth = async () => {
         const token = localStorage.getItem('token');
         if (!token) {
            setIsAuthenticated(false);
            setLoading(false);
            return;
         }
         try {
            // const jwt_decode = (await import('jwt-decode')).default;
            const decoded = jwtDecode(token);
            setIsAuthenticated(decoded.exp > Date.now() / 1000);
         } catch (error) {
            setIsAuthenticated(false);
         } finally {
            setLoading(false);
         }
      };
      checkAuth();
   }, []);

   if (loading) {
      return <div>Loading...</div>; // O un spinner de carga
   }

   return isAuthenticated ? (
      children
   ) : (
      <Navigate to='/login' replace state={{ from: location }} />
   );
};

ProtectedRoute.propTypes = {
   children: PropTypes.object,
};
