// Componentes React
import { useState, useEffect, useRef, useContext } from 'react';

// Contexto
import { ShalomContext } from '../../Context';

// Componentes
import { Layout } from '../../components/Layout';

// Librerias
import axios from 'axios';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Tooltip } from '@material-ui/core';
import { Dialog } from '@material-ui/core';

// Mensajes pop-pup
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// API
import {
   consultarMiembrosAPI,
   insertarMiembroAPI,
   editarMiembroAPI,
   eliminarMiembroAPI,
} from '../../utils/api';

export const Miembros = () => {
   // Crear contexto
   const context = useContext(ShalomContext);

   // Formulario
   const form = useRef(null);

   const onSubmitForm = async (event) => {
      event.preventDefault();

      const fd = new FormData(form.current);
      const nuevoMiembro = {};

      fd.forEach((value, key) => {
         nuevoMiembro[key] = value;
      });
      await insertarMiembroAPI(
         {
            cedula: nuevoMiembro.identificacion,
            nombres: nuevoMiembro.nombres,
            apellidos: nuevoMiembro.apellidos,
            celular: nuevoMiembro.celular,
         },
         (response) => {
            console.log(JSON.stringify(response.data));
            toast.success('Miembro agregado');
         },
         (error) => {
            console.log(error);
            toast.error('Error agregando Miembro');
         }
      );

      context.setMostrarTabla(true);
   };

   useEffect(() => {
      const consultarMiembros = async () => {
         await consultarMiembrosAPI(
            (response) => {
               // console.log(JSON.stringify(response.data));
               context.setMiembros(response.data);
               context.setEjecutarConsulta(false);
            },
            (error) => {
               console.log('Salio un error: ', error);
            }
         );
      };

      if (context.ejecutarConsulta) {
         consultarMiembros();
      }
   }, [context.ejecutarConsulta]);

   useEffect(() => {
      if (context.mostrarTabla) {
         context.setEjecutarConsulta(true);
      }
   }, [context.mostrarTabla]);

   // Cambiar texto y color botón
   useEffect(() => {
      if (context.mostrarTabla) {
         context.setTextoBoton('Agregar Miembro');
         context.setColorBoton('bg-green-500');
      } else {
         context.setTextoBoton('Mostrar Miembros');
         context.setColorBoton('bg-indigo-500');
      }
   }, [context.mostrarTabla]);

   const TablaMiembros = ({ miembros }) => {
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
            <h3 className='text-2xl font-extrabold'>Listado de usuarios</h3>
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

   const FilaMiembro = ({ miembro, onUpdateMiembro, onDeleteMiembro }) => {
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
                     <Tooltip
                        title='Confirmar Edición'
                        placement='top-end'
                        arrow
                     >
                        <i
                           onClick={onUpdateObjetoMiembro}
                           className='fas fa-check text-green-500 mx-2 cursor-pointer'
                        />
                     </Tooltip>
                     <Tooltip
                        title='Candelar Edición'
                        placement='top-start'
                        arrow
                     >
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
                     <Tooltip
                        title='Eliminar Miembro'
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

   const FormularioMiembros = () => {
      return (
         <div>
            <h2 className='text-2xl font-extrabold mb-6'>
               Crear Nuevo Miembro
            </h2>
            <form ref={form} name='formMiembro' onSubmit={onSubmitForm}>
               <input type='hidden' name='id_miembro' id='id_miembro' />
               <label htmlFor='identificacion' className='flex flex-col'>
                  Identificación
                  <input
                     type='text'
                     name='identificacion'
                     id='identificacion'
                     placeholder='11222333'
                     required
                     className='border border-gray-500 p-2 mt-2 mb-3 rounded-lg focus:outline-none focus:border-indigo-500'
                  />
               </label>
               <label htmlFor='nombres' className='flex flex-col'>
                  Nombres
                  <input
                     type='text'
                     name='nombres'
                     id='nombres'
                     placeholder='Franklim'
                     required
                     className='border border-gray-500 p-2 mt-2 mb-3 rounded-lg focus:outline-none focus:border-indigo-500'
                  />
               </label>
               <label htmlFor='apellidos' className='flex flex-col'>
                  Apellidos
                  <input
                     type='text'
                     name='apellidos'
                     id='apellidos'
                     placeholder='Arboleda Falla'
                     required
                     className='border border-gray-500 p-2 mt-2 mb-3 rounded-lg focus:outline-none focus:border-indigo-500'
                  />
               </label>
               <label htmlFor='celular' className='flex flex-col'>
                  Celular
                  <input
                     type='text'
                     name='celular'
                     id='celular'
                     placeholder='3208371159'
                     required
                     className='border border-gray-500 p-2 mt-2 mb-3 rounded-lg focus:outline-none focus:border-indigo-500'
                  />
               </label>
               <div className='flex justify-center items-center mt-4'>
                  <button
                     type='submit'
                     className='bg-green-400 p-2 rounded-full text-white shadow-md hover:bg-green-600'
                  >
                     Guardar
                  </button>
               </div>
            </form>
         </div>
      );
   };

   return (
      <Layout>
         <div className='flex flex-col h-full w-full items-center justify-center'>
            <div className='flex flex-col mb-12'>
               <h2 className='text-3xl font-extrabold text-center'>
                  Administración de Miembros
               </h2>
               <button
                  onClick={() => {
                     context.setMostrarTabla(!context.mostrarTabla);
                  }}
                  className={`${context.colorBoton} text-white rounded-full p-5 mt-6 h-28 w-28 self-end`}
               >
                  {context.textoBoton}
               </button>
            </div>
            {context.mostrarTabla ? (
               <TablaMiembros miembros={context.miembros} />
            ) : (
               <FormularioMiembros />
            )}
            <ToastContainer position='bottom-center' autoClose={3000} />
         </div>
      </Layout>
   );
};

Miembros.propTypes = {
   miembros: PropTypes.array,
   miembro: PropTypes.object,
   onUpdateMiembro: PropTypes.func,
   onDeleteMiembro: PropTypes.func,
};
