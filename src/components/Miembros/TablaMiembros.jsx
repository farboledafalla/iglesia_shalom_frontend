// Componentes React
import { useContext } from 'react';

// Componentes Miembros
import { FilaMiembro } from './FilaMiembro';

// Contexto
import { ShalomContext } from '../../Context';

// API
import { editarMiembroAPI, eliminarMiembroAPI } from '../../utils/api';

// Mensajes pop-pup
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Librerias
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

export const TablaMiembros = ({ miembros }) => {
   // Crear contexto
   const context = useContext(ShalomContext);

   // Actualizar
   const onUpdateMiembro = async (miembroActualizado) => {
      await editarMiembroAPI(
         miembroActualizado.id_miembro,
         {
            cedula: miembroActualizado.cedula,
            nombres: miembroActualizado.nombres,
            apellidos: miembroActualizado.apellidos,
            celular: miembroActualizado.celular,
         },
         (response) => {
            console.log(JSON.stringify(response.data));
            toast.success('Miembro actualizado');
            // Para que cargue los nuevos valores
            context.setEjecutarConsulta(true);
         },
         (error) => {
            console.log(error);
            toast.error('Error actualizando Miembro');
         }
      );
   };

   // Eliminar
   const onDeleteMiembro = async (miembroAEliminar) => {
      await eliminarMiembroAPI(
         miembroAEliminar.id_miembro,
         (response) => {
            console.log(JSON.stringify(response.data));
            toast.success('Miembro Eliminado');
            // Para que cargue los nuevos valores
            context.setEjecutarConsulta(true);
         },
         (error) => {
            console.log(error);
            toast.error('Error eliminando Miembro');
         }
      );
   };

   return (
      <div className='flex flex-col items-center justify-center'>
         <h3 className='text-2xl font-extrabold'>Listado de Usuarios</h3>
         <table className='tabla'>
            <thead>
               <tr>
                  <th>Identificación</th>
                  <th>Nombres</th>
                  <th>Apellidos</th>
                  <th>Celular</th>
                  <th>Acciones</th>
               </tr>
            </thead>
            <tbody>
               {miembros.map((miembro) => {
                  return (
                     <FilaMiembro
                        key={nanoid()}
                        miembro={miembro}
                        onUpdateMiembro={onUpdateMiembro}
                        onDeleteMiembro={onDeleteMiembro}
                     />
                  );
               })}
            </tbody>
         </table>
      </div>
   );
};

TablaMiembros.propTypes = {
   miembros: PropTypes.array,
};
