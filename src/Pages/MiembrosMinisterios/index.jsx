// Componentes React
import { useEffect, useContext, useRef, useState } from 'react';

// Contexto
import { ShalomContext } from '../../Context';

// Componente Miembros - Ministerios
import { FormularioMiembrosMinisterios } from '../../components/MiembrosMinisterios/FormularioMiembrosMinisterios';
import { TablaMiembrosMinisterios } from '../../components/MiembrosMinisterios/TablaMiembrosMinisterios';

// API
import {
   consultarMiembrosMinisteriosAPI,
   consultarMiembrosAPI,
   consultarMinisteriosAPI,
   insertarMiembroMinisterioAPI,
} from '../../utils/api';

// Componentes
import { Layout } from '../../components/Layout';

// Mensajes pop-pup
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const MiembrosMinisterios = () => {
   // Crear contexto
   const context = useContext(ShalomContext);

   // Formulario
   const form = useRef(null);

   // Estado local para miembros
   const [miembrosLocal, setMiembrosLocal] = useState([]);
   const [ministeriosLocal, setMinisteriosLocal] = useState([]);
   const [reload, setReload] = useState(false); // Nuevo estado para forzar el re-render

   // Guardar registro
   const onSubmitForm = async (event) => {
      event.preventDefault();

      const fd = new FormData(form.current);
      const nuevoMiembroMinisterio = {};

      fd.forEach((value, key) => {
         nuevoMiembroMinisterio[key] = value;
      });

      console.log('Registro', nuevoMiembroMinisterio);

      await insertarMiembroMinisterioAPI(
         {
            id_miembro: nuevoMiembroMinisterio.id_miembro,
            id_ministerio: nuevoMiembroMinisterio.id_ministerio,
         },
         (response) => {
            console.log(JSON.stringify(response.data));
            toast.success('Registro agregado');
            context.setMostrarTablaMieMin(true);
            setReload((prevReload) => !prevReload); // Forzar re-render
         },
         (error) => {
            console.log(error);
            toast.error('Error agregando registro');
         }
      );
   };

   useEffect(() => {
      const consultarMiembrosMinisterios = async () => {
         await consultarMiembrosMinisteriosAPI(
            (response) => {
               // console.log(JSON.stringify(response.data));
               context.setMiembrosMinisterios(response.data);
               context.setEjecutarConsultaMieMin(false);
            },
            (error) => {
               console.log('Salio un error: ', error);
            }
         );
      };

      if (context.ejecutarConsultaMieMin) {
         consultarMiembrosMinisterios();
      }
   }, [context.ejecutarConsultaMieMin, reload]);

   useEffect(() => {
      if (context.mostrarTablaMieMin) {
         context.setEjecutarConsultaMieMin(true);
      }
   }, [context.mostrarTablaMieMin]);

   // Consultar Miembros para llenar select
   useEffect(() => {
      const consultarMiembros = async () => {
         await consultarMiembrosAPI(
            (response) => {
               // console.log(JSON.stringify(response.data));
               setMiembrosLocal(response.data);
               // context.setEjecutarConsulta(false);
            },
            (error) => {
               console.log('Salio un error: ', error);
            }
         );
      };

      consultarMiembros();
   }, []);

   // Consultar Ministerios para llenar select
   useEffect(() => {
      const consultarMinisterios = async () => {
         await consultarMinisteriosAPI(
            (response) => {
               // console.log(JSON.stringify(response.data));
               setMinisteriosLocal(response.data);
            },
            (error) => {
               console.log('Salio un error: ', error);
            }
         );
      };

      consultarMinisterios();
   }, []);

   return (
      <Layout>
         <div className='flex flex-col h-full w-full items-center justify-center'>
            <div className='flex flex-col mb-12'>
               <h2 className='text-3xl font-extrabold text-center'>
                  Miembros - Ministerios
               </h2>
               <div className='flex justify-between items-center mt-8'>
                  <form
                     ref={form}
                     onSubmit={onSubmitForm}
                     name='formMiembroMinisterio'
                     className='flex justify-around w-full'
                  >
                     <div>
                        {/* <input
                           type='hidden'
                           name='id_miembro'
                           id='id_miembro'
                        /> */}
                        <label htmlFor='miembro' className='flex flex-col'>
                           Miembro
                           <select
                              id='id_miembro'
                              name='id_miembro'
                              className='border border-gray-500 p-2 mt-2 mb-3 rounded-lg focus:outline-none focus:border-indigo-500'
                           >
                              <option disabled selected>
                                 Seleccione
                              </option>
                              {miembrosLocal.map((miembroLocal) => (
                                 <option
                                    key={miembroLocal.id_miembro}
                                    value={miembroLocal.id_miembro}
                                 >
                                    {miembroLocal.nombres}
                                 </option>
                              ))}
                           </select>
                        </label>
                        {/* <input
                           type='hidden'
                           name='id_ministerio'
                           id='id_ministerio'
                        /> */}
                        <label htmlFor='miembro' className='flex flex-col'>
                           Ministerio
                           <select
                              id='id_ministerio'
                              name='id_ministerio'
                              className='border border-gray-500 p-2 mt-2 mb-3 rounded-lg focus:outline-none focus:border-indigo-500'
                           >
                              <option disabled selected>
                                 Seleccione
                              </option>
                              {ministeriosLocal.map((ministerioLocal) => (
                                 <option
                                    key={ministerioLocal.id_ministerio}
                                    value={ministerioLocal.id_ministerio}
                                 >
                                    {ministerioLocal.nombre}
                                 </option>
                              ))}
                           </select>
                        </label>
                     </div>
                     <div className='flex justify-center items-center mt-4'>
                        <button
                           type='submit'
                           className='bg-green-400 py-2 px-4 rounded-full text-white shadow-md hover:bg-green-600'
                        >
                           Guardar
                        </button>
                     </div>
                  </form>
                  {/* <button
                     onClick={() => {
                        context.setMostrarTablaMieMin(
                           !context.mostrarTablaMieMin
                        );
                     }}
                     className={`${context.colorBotonMieMin} text-white rounded-full p-5 mt-6 h-28 w-28 self-end`}
                  >
                     {context.textoBotonMieMin}
                  </button> */}
               </div>
            </div>
            {context.mostrarTablaMieMin ? (
               <TablaMiembrosMinisterios
                  miembrosMinisterios={context.miembrosMinisterios}
               />
            ) : (
               <FormularioMiembrosMinisterios />
            )}
            <ToastContainer position='bottom-center' autoClose={3000} />
         </div>
      </Layout>
   );
};
