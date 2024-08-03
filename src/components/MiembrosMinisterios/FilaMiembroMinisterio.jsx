// Componentes React
import { useEffect, useState, useContext } from 'react';

// Contexto
import { ShalomContext } from '../../Context';

import {
   consultarMinisteriosAPI,
   editarMiembroMinisterioAPI,
} from '../../utils/api';

// Librerias
import PropTypes from 'prop-types';
import { Tooltip } from '@mui/material';
import { Dialog } from '@mui/material';
import { nanoid } from 'nanoid';

// Mensajes pop-pup
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Tratamiento de fecha
import moment from 'moment';

export const FilaMiembroMinisterio = ({ miembroMinisterio }) => {
   // Crear contexto
   const context = useContext(ShalomContext);

   // Estados
   const [localMiembroMinisterio, setLocalMiembroMinisterio] =
      useState(miembroMinisterio);
   const [edit, setEdit] = useState(false);
   const [openDialog, setOpenDialog] = useState(false);
   const [ministeriosLocal, setMinisteriosLocal] = useState([]);
   const [ministerioInicial, setMinisterioInicial] = useState('');
   const [ministerioFinal, setMinisterioFinal] = useState('');

   // Actualizar
   const onUpdateMiembroMinisterio = async () => {
      await editarMiembroMinisterioAPI(
         ministerioInicial,
         {
            id_miembro: miembroMinisterio.id_miembro,
            id_ministerio: ministerioFinal,
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

   useEffect(() => {
      setLocalMiembroMinisterio(miembroMinisterio);
   }, [miembroMinisterio]);

   const handleEditToggle = () => {
      setEdit(!edit);
   };

   // Guardar los cambios
   const handleInputChange = (event) => {
      const { name, value } = event.target;
      setLocalMiembroMinisterio({
         ...localMiembroMinisterio,
         [name]: value,
      });
   };

   // Enviar al padre objeto editado
   const handleUpdate = () => {
      console.log('Hola desde handleUpdate');
      onUpdateMiembroMinisterio();
      setEdit(false);
   };

   // Enviar al padre objeto para eliminar
   const handleDelete = () => {
      console.log('Hola desde handleDelete');
      setOpenDialog(false);
   };

   // Consultar Ministerios para llenar select
   useEffect(() => {
      const consultarMinisterios = async () => {
         await consultarMinisteriosAPI(
            (response) => {
               console.log(JSON.stringify(response.data));
               setMinisteriosLocal(response.data);
               // const defaultOption = response.data.find(option => option.id_ministerio === )
            },
            (error) => {
               console.log('Salio un error: ', error);
            }
         );
      };

      if (edit) {
         setMinisterioInicial(miembroMinisterio.id_ministerio);
         setMinisterioFinal(miembroMinisterio.id_ministerio);
         consultarMinisterios();
      }
   }, [edit]);

   return (
      <tr>
         {edit ? (
            <>
               <td>
                  {/* <input type='hidden' value={miembroMinisterio.id_miembro} /> */}
                  <input
                     type='text'
                     name='nombre_completo'
                     readOnly
                     value={miembroMinisterio.nombre_completo}
                     onChange={handleInputChange}
                     className='border border-gray-500 p-2 mt-2 mb-3 rounded-lg focus:outline-none focus:border-indigo-500'
                  />
               </td>
               <td>
                  <select
                     id='id_ministerio'
                     name='id_ministerio'
                     value={ministerioFinal}
                     onChange={(e) => setMinisterioFinal(e.target.value)}
                     className='border border-gray-500 p-2 mt-2 mb-3 rounded-lg focus:outline-none focus:border-indigo-500'
                  >
                     <option disabled selected>
                        Seleccione
                     </option>
                     {ministeriosLocal.map((ministerioLocal) => (
                        <option
                           key={nanoid()}
                           value={ministerioLocal.id_ministerio}
                        >
                           {ministerioLocal.nombre}
                        </option>
                     ))}
                  </select>
               </td>
            </>
         ) : (
            <>
               <td>{miembroMinisterio.nombre_completo}</td>
               <td>{miembroMinisterio.nombre}</td>
               <td>
                  {miembroMinisterio.fecha_ingreso === null
                     ? miembroMinisterio.fecha_ingreso
                     : moment(miembroMinisterio.fecha_ingreso).format(
                          'YYYY-MM-DD HH:MM:SS'
                       )}
               </td>
               <td>{miembroMinisterio.fecha_retiro}</td>
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
