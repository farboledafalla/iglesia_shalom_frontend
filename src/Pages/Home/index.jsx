// Componentes
import { Layout } from '../../components/Layout';

import axios from 'axios';

export const Home = () => {
   const handleGetUser = async () => {
      try {
         const token = localStorage.getItem('token');
         const response = await axios.get('http://localhost:3000/api/me', {
            headers: { 'x-access-token': token },
         });
         console.log(response.data);
      } catch (error) {
         console.error('Error fetching user data', error);
      }
   };

   return (
      <Layout>
         <div>
            <h1>Home</h1>
            <button onClick={handleGetUser}>Get User Info</button>
         </div>
      </Layout>
   );
};
