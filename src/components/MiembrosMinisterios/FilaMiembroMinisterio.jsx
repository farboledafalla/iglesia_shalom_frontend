// Componentes React
import { useEffect, useState, useContext } from 'react';

// Contexto
import { ShalomContext } from '../../Context';

import {
   editarMiembroMinisterioAPI,
   retirarMiembroMinisterioAPI,
   eliminarMiembroMinisterioAPI,
} from '../../utils/api';

// Librerias
import PropTypes from 'prop-types';
import { Tooltip } from '@mui/material';
import { Dialog } from '@mui/material';

// Mensajes pop-pup
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Tratamiento de fecha
import moment from 'moment';

export const FilaMiembroMinisterio = ({ miembroMinisterio }) => {
   // Crear contexto
   const context = useContext(ShalomContext);

   // Estados
   useState(miembroMinisterio);
   const [edit, setEdit] = useState(false);
   const [openDialog, setOpenDialog] = useState(false);
   const [fechaIngreso, setFechaIngreso] = useState('');
   const [fechaRetiro, setFechaRetiro] = useState('');
   const [openDialogDelete, setOpenDialogDelete] = useState(false);

   // Actualizar
   const onUpdateMiembroMinisterio = async () => {
      await editarMiembroMinisterioAPI(
         {
            id_miembro: miembroMinisterio.id_miembro,
            id_ministerio: miembroMinisterio.id_ministerio,
         },
         {
            fechaIngreso,
         },
         (response) => {
            console.log(JSON.stringify(response.data));
            toast.success('Registro actualizado');
            // Para que cargue los nuevos valores
            context.setEjecutarConsultaMieMin(true);
         },
         (error) => {
            console.log(error);
            toast.error('Error actualizando Miembro');
         }
      );
   };

   // Retirar Miembro del Ministerio
   const onWithdrawMiembroMinisterio = async () => {
      await retirarMiembroMinisterioAPI(
         {
            id_miembro: miembroMinisterio.id_miembro,
            id_ministerio: miembroMinisterio.id_ministerio,
         },
         (response) => {
            console.log(JSON.stringify(response.data));
            toast.success('Miembro retirado del ministerio');
            context.setEjecutarConsultaMieMin(true);
         },
         (error) => {
            console.log(error);
            toast.error('Error retirando miembro del ministerio');
         }
      );
   };

   // Eliminar registro de la pantalla
   const onDeleteMiembroMinisterio = async () => {
      await eliminarMiembroMinisterioAPI(
         {
            id_miembro: miembroMinisterio.id_miembro,
            id_ministerio: miembroMinisterio.id_ministerio,
         },
         (response) => {
            console.log(JSON.stringify(response.data));
            toast.success('Registro eliminado');
            context.setEjecutarConsultaMieMin(true);
         },
         (error) => {
            console.log(error);
            toast.error('Error eliminando registro');
         }
      );
   };

   const handleEditToggle = () => {
      setEdit(!edit);
   };

   // Manejar evento del calendario
   const handleInputDateIngreso = (event) => {
      setFechaIngreso(event.target.value);
   };

   const handleInputDateRetiro = (event) => {
      setFechaRetiro(event.target.value);
   };

   // Editar fecha de ingreso
   const handleUpdate = () => {
      console.log('miembroMinisterio.estado: ', miembroMinisterio.estado);
      onUpdateMiembroMinisterio();
      setEdit(false);
   };

   // Retirar miembro del ministerio
   const handleWithdraw = () => {
      onWithdrawMiembroMinisterio();
      setOpenDialog(false);
   };

   const handleDelete = () => {
      onDeleteMiembroMinisterio();
      setOpenDialogDelete(false);
   };

   // Establecer fechas
   useEffect(() => {
      if (edit) {
         setFechaIngreso(formatDate(miembroMinisterio.fecha_ingreso));
         setFechaRetiro(formatDate(miembroMinisterio.fecha_retiro));
      }
   }, [edit]);

   // Formatear fecha
   const formatDate = (dateStr) => {
      return moment(dateStr).format('YYYY-MM-DD HH:mm:ss');
   };

   return (
      <tr>
         {edit ? (
            <>
               <td>
                  <input
                     type='text'
                     name='nombre_completo'
                     readOnly
                     value={miembroMinisterio.nombre_completo}
                     className='border border-gray-500 p-2 mt-2 mb-3 rounded-lg focus:outline-none focus:border-indigo-500'
                  />
               </td>
               <td>
                  <input
                     type='text'
                     name='id_ministerio'
                     readOnly
                     value={miembroMinisterio.nombre}
                     className='border border-gray-500 p-2 mt-2 mb-3 rounded-lg focus:outline-none focus:border-indigo-500'
                  />
               </td>
               <td>
                  <input
                     type='datetime-local'
                     id='fecha_ingreso'
                     name='fecha_ingreso'
                     value={formatDate(fechaIngreso)}
                     onChange={handleInputDateIngreso}
                  ></input>
               </td>
               <td>
                  {miembroMinisterio.estado == 'C' && (
                     <input
                        type='datetime-local'
                        id='fecha_retiro'
                        name='fecha_retiro'
                        value={formatDate(fechaRetiro)}
                        onChange={handleInputDateRetiro}
                     ></input>
                  )}
               </td>
            </>
         ) : (
            <>
               <td>{miembroMinisterio.nombre_completo}</td>
               <td>{miembroMinisterio.nombre}</td>
               <td>
                  {miembroMinisterio.fecha_ingreso === null
                     ? miembroMinisterio.fecha_ingreso
                     : formatDate(miembroMinisterio.fecha_ingreso)}
               </td>
               <td>
                  {miembroMinisterio.fecha_retiro === null
                     ? miembroMinisterio.fecha_retiro
                     : formatDate(miembroMinisterio.fecha_retiro)}
               </td>
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
                  <Tooltip
                     title='Editar Fecha Ingreso'
                     placement='top-end'
                     arrow
                  >
                     <i
                        onClick={handleEditToggle}
                        className='fas fa-pencil-alt text-yellow-500 mx-2 cursor-pointer'
                     />
                  </Tooltip>
                  {miembroMinisterio.estado == 'A' ? (
                     <Tooltip
                        title='Retirar del Ministerio'
                        placement='top-start'
                        arrow
                     >
                        <i
                           onClick={() => setOpenDialog(true)}
                           className='fas fa-door-open text-orange-500 mx-2 cursor-pointer'
                        />
                     </Tooltip>
                  ) : (
                     <i className='fas fa-door-open text-white mx-2 hover:text-slate-200' />
                  )}
                  {miembroMinisterio.estado == 'C' ? (
                     <Tooltip
                        title='Eliminar registro'
                        placement='top-end'
                        arrow
                     >
                        <i
                           onClick={() => setOpenDialogDelete(true)}
                           className='fas fa-trash text-red-500 mx-2 cursor-pointer'
                        />
                     </Tooltip>
                  ) : (
                     <i className='fas fa-trash text-white mx-2 hover:text-slate-200' />
                  )}
               </>
            )}
            <Dialog open={openDialog}>
               <div className='p-8 flex flex-col'>
                  <h1 className='text-gray-900 text-2xl font-bold'>
                     ¿Seguro de retirar miembro del ministerio?
                  </h1>
                  <div className='flex w-full items-center justify-center my-4'>
                     <button
                        onClick={handleWithdraw}
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
            <Dialog open={openDialogDelete}>
               <div className='p-8 flex flex-col'>
                  <h1 className='text-gray-900 text-2xl font-bold'>
                     ¿Seguro desea eliminar el registro?
                  </h1>
                  <div className='flex w-full items-center justify-center my-4'>
                     <button
                        onClick={handleDelete}
                        className='mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md'
                     >
                        Si
                     </button>
                     <button
                        onClick={() => setOpenDialogDelete(false)}
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
