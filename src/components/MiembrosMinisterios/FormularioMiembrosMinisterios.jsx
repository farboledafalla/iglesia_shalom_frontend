// Componentes React
import { useContext, useRef, useEffect, useState } from 'react';

// Contexto
import { ShalomContext } from '../../Context';

// API
import {
   insertarMiembroMinisterioAPI,
   consultarMiembrosAPI,
   consultarMinisteriosAPI,
} from '../../utils/api';

// Mensajes pop-pup
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const FormularioMiembrosMinisterios = () => {
   // Crear contexto
   const context = useContext(ShalomContext);

   // Formulario
   const form = useRef(null);

   // Estado local para miembros
   const [miembrosLocal, setMiembrosLocal] = useState([]);
   const [ministeriosLocal, setMinisteriosLocal] = useState([]);

   // Guardar registro
   const onSubmitForm = async (event) => {
      event.preventDefault();

      const fd = new FormData(form.current);
      const nuevoMiembroMinisterio = {};

      fd.forEach((value, key) => {
         nuevoMiembroMinisterio[key] = value;
      });

      await insertarMiembroMinisterioAPI(
         {
            id_miembro: nuevoMiembroMinisterio.id_miembro,
            id_ministerio: nuevoMiembroMinisterio.id_ministerio,
         },
         (response) => {
            console.log(JSON.stringify(response.data));
            toast.success('Registro agregado');
            context.setMostrarTablaMieMin(true);
            // context.setMostrarTablaMieMin(!context.mostrarTablaMieMin);
            // setReload((prevReload) => !prevReload); // Forzar re-render
         },
         (error) => {
            console.log(error);
            toast.error('Error agregando registro');
         }
      );
   };

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
      <div>
         <h2 className='text-2xl font-extrabold mb-6'>
            Miembros - Ministerios
         </h2>
         <form ref={form} onSubmit={onSubmitForm} name='formMiembroMinisterio'>
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
            <div className='flex justify-center items-center mt-4'>
               <button
                  type='submit'
                  className='bg-green-400 py-2 px-4 rounded-full text-white shadow-md hover:bg-green-600'
               >
                  Guardar
               </button>
            </div>
         </form>
      </div>
   );
};
