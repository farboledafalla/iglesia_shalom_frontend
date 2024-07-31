// Componentes React
import { useEffect, useState } from 'react';

// Librerias
import PropTypes from 'prop-types';
import { Tooltip } from '@material-ui/core';
import { Dialog } from '@material-ui/core';

export const FilaMiembroMinisterio = ({ miembroMinisterio }) => {
   // Estados
   const [localMiembroMinisterio, setLocalMiembroMinisterio] =
      useState(miembroMinisterio);
   const [edit, setEdit] = useState(false);
   const [openDialog, setOpenDialog] = useState(false);

   useEffect(() => {
      setLocalMiembroMinisterio(miembroMinisterio);
   }, [miembroMinisterio]);

   const handleEditToggle = () => {
      setEdit(!edit);
   };

   // Enviar al padre objeto editado
   const handleUpdate = () => {
      console.log('Hola desde handleUpdate');
      setEdit(false);
   };

   // Enviar al padre objeto para eliminar
   const handleDelete = () => {
      console.log('Hola desde handleDelete');
      setOpenDialog(false);
   };

   return (
      <tr>
         <td>{miembroMinisterio.nombre_completo}</td>
         <td>{miembroMinisterio.nombre}</td>
         {/* <td>{miembroMinisterio.id_ministerio}</td>
         <td>{miembroMinisterio.nombre}</td> */}

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
                  <Tooltip title='Editar Registro' placement='top-end' arrow>
                     <i
                        onClick={handleEditToggle}
                        className='fas fa-pencil-alt text-yellow-500 mx-2 cursor-pointer'
                     />
                  </Tooltip>
                  <Tooltip
                     title='Eliminar Registro'
                     placement='top-start'
                     arrow
                  >
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
                     ¿Seguro de eliminar el Registro?
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

FilaMiembroMinisterio.propTypes = {
   miembroMinisterio: PropTypes.object,
   // onUpdateMiembro: PropTypes.func,
   // onDeleteMiembro: PropTypes.func,
};
