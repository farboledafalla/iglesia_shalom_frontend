import { useContext, useState } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import axios from 'axios';
import { Layout } from '../../components/Layout';

// Contexto
import { ShalomContext } from '../../Context';

// Auth
import { UserInfo } from '../../components/Auth/UserInfo';

export const Login = () => {
   // Crear contexto
   const context = useContext(ShalomContext);

   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const navigate = useNavigate();
   const location = useLocation();

   // Obtiene la ruta desde donde viene, si no existe deja la raiz
   const from = location.state?.from?.pathname || '/';

   const handleLogin = async (e) => {
      e.preventDefault();
      try {
         const response = await axios.post('http://localhost:3000/api/login', {
            username,
            password,
         });
         localStorage.setItem('token', response.data.token);
         console.log(response.data);
         context.setLoggedUser(UserInfo());

         //Navega a la ruta desde doncde intentó ingresar
         navigate(from, { replace: true });
      } catch (error) {
         console.error('Error en el login: ', error);
         alert(error.response.data.error);
      }
   };

   return (
      <Layout>
         <div className='flex flex-col justify-center items-center'>
            <h1 className='text-3xl font-extrabold mb-5'>Login</h1>
            <form onSubmit={handleLogin}>
               <div>
                  <label className='flex flex-col'>
                     Username
                     <input
                        type='text'
                        id='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete='username'
                        className='border border-gray-500 p-2 mt-2 mb-3 rounded-lg focus:outline-none focus:border-indigo-500'
                     />
                  </label>
               </div>
               <div>
                  <label className='flex flex-col'>
                     Password
                     <input
                        type='password'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete='current-password'
                        className='border border-gray-500 p-2 mt-2 mb-3 rounded-lg focus:outline-none focus:border-indigo-500'
                     />
                  </label>
               </div>
               <div className='flex justify-center items-center mt-4'>
                  <button
                     type='submit'
                     className='bg-green-400 p-2 rounded-full text-white shadow-md hover:bg-green-600'
                  >
                     Login
                  </button>
               </div>
            </form>
            <div className='mt-6 text-center text-blue-500 underline underline-offset-2'>
               <NavLink to='/register'>Registrarme</NavLink>
            </div>
         </div>
      </Layout>
   );
};
