// Componentes React
import { useEffect, useState } from 'react';

// Librerias
import PropTypes from 'prop-types';
import { Tooltip } from '@material-ui/core';
import { Dialog } from '@material-ui/core';

export const FilaMiembro = ({ miembro, onUpdateMiembro, onDeleteMiembro }) => {
   // Estados
   const [localMiembro, setLocalMiembro] = useState(miembro);
   const [edit, setEdit] = useState(false);
   const [openDialog, setOpenDialog] = useState(false);

   useEffect(() => {
      setLocalMiembro(miembro);
   }, [miembro]);

   // Cambia con el botón editar
   const handleEditToggle = () => {
      setEdit(!edit);
   };

   // Guardar los cambios
   const handleInputChange = (event) => {
      const { name, value } = event.target;
      setLocalMiembro({
         ...localMiembro,
         [name]: value,
      });
   };

   // Enviar al padre objeto editado
   const handleUpdate = () => {
      onUpdateMiembro(localMiembro);
      setEdit(false);
   };

   // Enviar al padre objeto para eliminar
   const handleDelete = () => {
      onDeleteMiembro(localMiembro);
   };

   return (
      <tr>
         {edit ? (
            <>
               <td>
                  <input type='hidden' value={localMiembro.id_miembro} />
                  <input
                     type='number'
                     name='cedula'
                     value={localMiembro.cedula}
                     onChange={handleInputChange}
                     className='border border-gray-500 p-2 mt-2 mb-3 rounded-lg focus:outline-none focus:border-indigo-500'
                  />
               </td>
               <td>
                  <input
                     type='text'
                     name='nombres'
                     value={localMiembro.nombres}
                     onChange={handleInputChange}
                     className='border border-gray-500 p-2 mt-2 mb-3 rounded-lg focus:outline-none focus:border-indigo-500'
                  />
               </td>
               <td>
                  <input
                     type='text'
                     name='apellidos'
                     value={localMiembro.apellidos}
                     onChange={handleInputChange}
                     className='border border-gray-500 p-2 mt-2 mb-3 rounded-lg focus:outline-none focus:border-indigo-500'
                  />
               </td>
               <td>
                  <input
                     type='number'
                     name='celular'
                     value={localMiembro.celular}
                     onChange={handleInputChange}
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
                        onClick={handleUpdate}
                        className='fas fa-check text-green-500 mx-2 cursor-pointer'
                     />
                  </Tooltip>
                  <Tooltip title='Cancelar Edición' placement='top-start' arrow>
                     <i
                        onClick={handleEditToggle}
                        className='fas fa-ban text-red-500 mx-2 cursor-pointer'
                     />
                  </Tooltip>
               </>
            ) : (
               <>
                  <Tooltip title='Editar Miembro' placement='top-end' arrow>
                     <i
                        onClick={handleEditToggle}
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
                        onClick={handleDelete}
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
