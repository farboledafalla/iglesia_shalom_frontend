// Componentes React
import { useEffect, useState } from 'react';

// Librerias
import PropTypes from 'prop-types';
import { Tooltip } from '@mui/material';
import { Dialog } from '@mui/material';

export const FilaMinisterio = ({
   ministerio,
   onUpdateMinisterio,
   onDeleteMinisterio,
}) => {
   // Estados
   const [localMinisterio, setLocalMinisterio] = useState(ministerio);
   const [edit, setEdit] = useState(false);
   const [openDialog, setOpenDialog] = useState(false);

   // Inicializar estado local
   useEffect(() => {
      setLocalMinisterio(ministerio);
   }, [ministerio]);

   // Cambia con el botón editar
   const handleEditToggle = () => {
      setEdit(!edit);
   };

   // Guardar los cambios
   const handleInputChange = (event) => {
      const { name, value } = event.target;
      setLocalMinisterio({
         ...localMinisterio,
         [name]: value,
      });
   };

   const handleDelete = () => {
      console.log('hadleDelete');
      onDeleteMinisterio(localMinisterio);
   };

   const handleUpdate = () => {
      console.log('handleUpdate');
      onUpdateMinisterio(localMinisterio);
   };

   return (
      <tr>
         {edit ? (
            <>
               <td>
                  <input type='hidden' value={localMinisterio.id_ministerio} />
                  <input
                     type='text'
                     name='nombre'
                     value={localMinisterio.nombre}
                     onChange={handleInputChange}
                     className='border border-gray-500 p-2 mt-2 mb-3 rounded-lg focus:outline-none focus:border-indigo-500'
                  />
               </td>
               <td>
                  <input
                     type='text'
                     name='descripcion'
                     value={localMinisterio.descripcion}
                     onChange={handleInputChange}
                     className='border border-gray-500 p-2 mt-2 mb-3 rounded-lg focus:outline-none focus:border-indigo-500'
                  />
               </td>
            </>
         ) : (
            <>
               <td>{ministerio.nombre}</td>
               <td>{ministerio.descripcion}</td>
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
                  <Tooltip title='Editar Ministerio' placement='top-end' arrow>
                     <i
                        onClick={handleEditToggle}
                        className='fas fa-pencil-alt text-yellow-500 mx-2 cursor-pointer'
                     />
                  </Tooltip>
                  <Tooltip
                     title='Eliminar Ministerio'
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
                     ¿Seguro de eliminar el Ministerio?
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

FilaMinisterio.propTypes = {
   ministerio: PropTypes.object,
   onUpdateMinisterio: PropTypes.func,
   onDeleteMinisterio: PropTypes.func,
};
