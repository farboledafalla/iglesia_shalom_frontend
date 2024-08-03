// Componentes Miembros - Ministerios
import { FilaMiembroMinisterio } from './FilaMiembroMinisterio';

// Librerias
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

export const TablaMiembrosMinisterios = ({ miembrosMinisterios }) => {
   return (
      <div className='flex flex-col items-center justify-center'>
         <h3 className='text-2xl font-extrabold'>
            Listado de Miembros - Ministerios
         </h3>
         <table className='tabla'>
            <thead>
               <tr>
                  <th>Miembro</th>
                  <th>Ministerio</th>
                  <th>Ingreso</th>
                  <th>Retiro</th>
                  <th>Acciones</th>
                  {/* <th>Apellidos</th>
                  <th>Celular</th> */}
               </tr>
            </thead>
            <tbody>
               {miembrosMinisterios.map((miembroMinisterio) => {
                  return (
                     <FilaMiembroMinisterio
                        key={nanoid()}
                        miembroMinisterio={miembroMinisterio}
                        // onUpdateMiembro={onUpdateMiembro}
                        // onDeleteMiembro={onDeleteMiembro}
                     />
                  );
               })}
            </tbody>
         </table>
      </div>
   );
};

TablaMiembrosMinisterios.propTypes = {
   miembrosMinisterios: PropTypes.array,
};
