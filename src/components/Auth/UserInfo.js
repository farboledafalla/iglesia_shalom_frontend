import { jwtDecode } from 'jwt-decode';

export const UserInfo = () => {
   const token = localStorage.getItem('token');
   if (token) {
      try {
         const decodedToken = jwtDecode(token);
         return decodedToken.username;
      } catch (error) {
         console.error('Error al decodificar el token:', error);
      }
   }
};
