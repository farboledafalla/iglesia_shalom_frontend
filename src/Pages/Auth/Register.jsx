import { useState } from 'react';
import axios from 'axios';

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
      <form onSubmit={handleRegister}>
         <div>
            <label>Username</label>
            <input
               type='text'
               value={username}
               onChange={(e) => setUsername(e.target.value)}
            />
         </div>
         <div>
            <label>Password</label>
            <input
               type='password'
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
         </div>
         <button type='submit'>Register</button>
      </form>
   );
};
