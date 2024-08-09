import { Navigate } from 'react-router-dom';

export const Logout = () => {
   localStorage.removeItem('token');
   console.log('Token eliminado');

   return <Navigate to='/login' />;
};
