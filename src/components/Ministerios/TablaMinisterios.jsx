import { useContext } from 'react';

// Contexto
import { ShalomContext } from '../../Context';

// API
import { editarMinisterioAPI, eliminarMinisterioAPI } from '../../utils/api';

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

   // Actualizar
   const onUpdateMinisterio = async (ministerioActualizado) => {
      await editarMinisterioAPI(
         ministerioActualizado.id_ministerio,
         {
            nombre: ministerioActualizado.nombre,
            descripcion: ministerioActualizado.descripcion,
         },
         (response) => {
            console.log(JSON.stringify(response.data));
            toast.success('Ministerio actualizado');
            context.setEjecutarConsultaMin(true);
         },
         (error) => {
            console.log(error);
            toast.error('Error actualizando Ministerio');
         }
      );
   };

   // Eliminar
   const onDeleteMinisterio = async (ministerioAEliminar) => {
      await eliminarMinisterioAPI(
         ministerioAEliminar.id_ministerio,
         (response) => {
            console.log(JSON.stringify(response.data));
            toast.success('Ministerio Eliminado');
            // Para que cargue los nuevos valores
            context.setEjecutarConsultaMin(true);
         },
         (error) => {
            console.log(error);
            toast.error(error.response.data.status);
         }
      );
   };

   return (
      <div className='flex flex-col items-center justify-center'>
         <h3 className='text-2xl font-extrabold'>Listado de Ministerios</h3>
         <table className='tabla'>
            <thead>
               <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
               </tr>
            </thead>
            <tbody>
               {ministerios.map((ministerio) => {
                  return (
                     <FilaMinisterio
                        key={nanoid()}
                        ministerio={ministerio}
                        onUpdateMinisterio={onUpdateMinisterio}
                        onDeleteMinisterio={onDeleteMinisterio}
                     />
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
