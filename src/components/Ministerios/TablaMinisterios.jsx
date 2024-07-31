import { useContext } from 'react';

// Contexto
import { ShalomContext } from '../../Context';

// Componentes Ministerios
import { FilaMinisterio } from './FilaMinisterio';

// Mensajes pop-pup
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Librerias
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

export const TablaMinisterios = ({ ministerios }) => {
   // Crear contexto
   const context = useContext(ShalomContext);

   return (
      <div className='flex flex-col items-center justify-center'>
         <h3 className='text-2xl font-extrabold'>Listado de Miembros</h3>
         <table className='tabla'>
            <thead>
               <tr>
                  <th>Identificación</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
               </tr>
            </thead>
            <tbody>
               {ministerios.map((ministerio) => {
                  return (
                     <FilaMinisterio key={nanoid()} ministerio={ministerio} />
                  );
               })}
            </tbody>
         </table>
      </div>
   );
};

TablaMinisterios.propTypes = {
   ministerios: PropTypes.array,
};
