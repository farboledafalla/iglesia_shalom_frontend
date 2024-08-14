import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

// Contexto
import { ShalomContext } from '../../Context';

export const Logout = () => {
   // Crear contexto
   const context = useContext(ShalomContext);

   localStorage.removeItem('token');
   console.log('Token eliminado');
   context.setLoggedUser('');

   return <Navigate to='/login' />;
};
