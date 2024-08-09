import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import PropTypes from 'prop-types';

export const ProtectedRoute = ({ children }) => {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [loading, setLoading] = useState(true);

   console.log('isAuthenticated 1: ', isAuthenticated);

   useEffect(() => {
      const checkAuth = async () => {
         const token = localStorage.getItem('token');
         console.log('token: ', token);
         if (!token) {
            setIsAuthenticated(false);
            setLoading(false);
            return;
         }
         try {
            // const jwt_decode = (await import('jwt-decode')).default;
            const decoded = jwtDecode(token);
            console.log('decoded: ', decoded);
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

   console.log('isAuthenticated 2: ', isAuthenticated);

   return isAuthenticated ? children : <Navigate to='/login' />;
};

ProtectedRoute.propTypes = {
   children: PropTypes.object,
};
