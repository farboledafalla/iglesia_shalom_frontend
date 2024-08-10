import { useState } from 'react';
import axios from 'axios';
import { Layout } from '../../components/Layout';
import { NavLink } from 'react-router-dom';

export const Register = () => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   const handleRegister = async (e) => {
      e.preventDefault();
      try {
         const response = await axios.post(
            'http://localhost:3000/api/register',
            {
               username,
               password,
            }
         );
         console.log(response.data);
      } catch (error) {
         console.error('Error registering', error);
      }
   };

   return (
      <Layout>
         <div className='flex flex-col justify-center items-center'>
            <h1 className='text-3xl font-extrabold mb-5'>Registro</h1>
            <form onSubmit={handleRegister}>
               <div>
                  <label className='flex flex-col'>
                     Username
                     <input
                        type='text'
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete='password'
                        className='border border-gray-500 p-2 mt-2 mb-3 rounded-lg focus:outline-none focus:border-indigo-500'
                     />
                  </label>
               </div>
               <div className='flex justify-center items-center mt-4'>
                  <button
                     type='submit'
                     className='bg-green-400 p-2 rounded-full text-white shadow-md hover:bg-green-600'
                  >
                     Registrarme
                  </button>
               </div>
               <div className='mt-6 text-center text-blue-500 underline underline-offset-2'>
                  <NavLink to='/login'>Login</NavLink>
               </div>
            </form>
         </div>
      </Layout>
   );
};
