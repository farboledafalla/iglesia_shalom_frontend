import { Miembros } from '../Miembros';
import { Ministerios } from '../Ministerios';
import { MiembrosMinisterios } from '../MiembrosMinisterios';
import { NotFound } from '../NotFound';

import './App.css';

export const App = () => {
   return (
      <div className='bg-green-600 text-white'>
         <Miembros />
         <Ministerios />
         <MiembrosMinisterios />
         <NotFound />
      </div>
   );
};
