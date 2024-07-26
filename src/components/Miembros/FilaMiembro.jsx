// Componentes React
import { useState } from 'react';

// Librerias
import PropTypes from 'prop-types';
import { Tooltip } from '@material-ui/core';
import { Dialog } from '@material-ui/core';

export const FilaMiembro = ({ miembro, onUpdateMiembro, onDeleteMiembro }) => {
   // Estados
   const [edit, setEdit] = useState(false);
   const [openDialog, setOpenDialog] = useState(false);
   const [infoNuevoMiembro, setInfoNuevoMiembro] = useState({
      id_miembro: miembro.id_miembro,
      cedula: miembro.cedula,
      nombres: miembro.nombres,
      apellidos: miembro.apellidos,
      celular: miembro.celular,
   });

   // Cambia con el botón editar
   const onEditMiembro = () => {
      console.log('id_miembro: ', infoNuevoMiembro.id_miembro);
      setEdit(!edit);
   };

   // Guardar los cambios
   const onUpdatePropiedadCedula = (event) => {
      setInfoNuevoMiembro({
         ...infoNuevoMiembro,
         cedula: event.target.value,
      });
   };
   const onUpdatePropiedadNombres = (event) => {
      setInfoNuevoMiembro({
         ...infoNuevoMiembro,
         nombres: event.target.value,
      });
   };
   const onUpdatePropiedadApellidos = (event) => {
      setInfoNuevoMiembro({
         ...infoNuevoMiembro,
         apellidos: event.target.value,
      });
   };
   const onUpdatePropiedadCelular = (event) => {
      setInfoNuevoMiembro({
         ...infoNuevoMiembro,
         celular: event.target.value,
      });
   };

   // Enviar al padre objeto editado
   const onUpdateObjetoMiembro = () => {
      onUpdateMiembro(infoNuevoMiembro);
      setEdit(false);
   };

   // Enviar al padre objeto para eliminar
   const onDeleteObjetoMiembro = () => {
      onDeleteMiembro(infoNuevoMiembro);
   };

   return (
      <tr>
         {edit ? (
            <>
               <td>
                  <input type='hidden' value={infoNuevoMiembro.id_miembro} />
                  <input
                     type='number'
                     value={infoNuevoMiembro.cedula}
                     onChange={onUpdatePropiedadCedula}
                     className='border border-gray-500 p-2 mt-2 mb-3 rounded-lg focus:outline-none focus:border-indigo-500'
                  />
               </td>
               <td>
                  <input
                     type='text'
                     value={infoNuevoMiembro.nombres}
                     onChange={onUpdatePropiedadNombres}
                     className='border border-gray-500 p-2 mt-2 mb-3 rounded-lg focus:outline-none focus:border-indigo-500'
                  />
               </td>
               <td>
                  <input
                     type='text'
                     value={infoNuevoMiembro.apellidos}
                     onChange={onUpdatePropiedadApellidos}
                     className='border border-gray-500 p-2 mt-2 mb-3 rounded-lg focus:outline-none focus:border-indigo-500'
                  />
               </td>
               <td>
                  <input
                     type='number'
                     value={infoNuevoMiembro.celular}
                     onChange={onUpdatePropiedadCelular}
                     className='border border-gray-500 p-2 mt-2 mb-3 rounded-lg focus:outline-none focus:border-indigo-500'
                  />
               </td>
            </>
         ) : (
            <>
               <td>{miembro.cedula}</td>
               <td>{miembro.nombres}</td>
               <td>{miembro.apellidos}</td>
               <td>{miembro.celular}</td>
            </>
         )}

         <td>
            {edit ? (
               <>
                  <Tooltip title='Confirmar Edición' placement='top-end' arrow>
                     <i
                        onClick={onUpdateObjetoMiembro}
                        className='fas fa-check text-green-500 mx-2 cursor-pointer'
                     />
                  </Tooltip>
                  <Tooltip title='Candelar Edición' placement='top-start' arrow>
                     <i
                        onClick={onEditMiembro}
                        className='fas fa-ban text-red-500 mx-2 cursor-pointer'
                     />
                  </Tooltip>
               </>
            ) : (
               <>
                  <Tooltip title='Editar Miembro' placement='top-end' arrow>
                     <i
                        onClick={onEditMiembro}
                        className='fas fa-pencil-alt text-yellow-500 mx-2 cursor-pointer'
                     />
                  </Tooltip>
                  <Tooltip title='Eliminar Miembro' placement='top-start' arrow>
                     <i
                        onClick={() => setOpenDialog(true)}
                        className='fas fa-trash text-red-500 mx-2 cursor-pointer'
                     />
                  </Tooltip>
               </>
            )}
            <Dialog open={openDialog}>
               <div className='p-8 flex flex-col'>
                  <h1 className='text-gray-900 text-2xl font-bold'>
                     ¿Seguro de eliminar el Miembro?
                  </h1>
                  <div className='flex w-full items-center justify-center my-4'>
                     <button
                        onClick={onDeleteObjetoMiembro}
                        className='mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md'
                     >
                        Si
                     </button>
                     <button
                        onClick={() => setOpenDialog(false)}
                        className='mx-2 px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md'
                     >
                        No
                     </button>
                  </div>
               </div>
            </Dialog>
         </td>
      </tr>
   );
};

FilaMiembro.propTypes = {
   miembro: PropTypes.object,
   onUpdateMiembro: PropTypes.func,
   onDeleteMiembro: PropTypes.func,
};
