// Componentes React
import { useContext, useRef } from 'react';

// Contexto
import { ShalomContext } from '../../Context';

// API
import { insertarMinisterioAPI } from '../../utils/api';

// Mensajes pop-pup
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const FormularioMinisterios = () => {
   // Crear contexto
   const context = useContext(ShalomContext);

   // Formulario
   const form = useRef(null);

   const onSubmitForm = async (event) => {
      event.preventDefault();

      const fd = new FormData(form.current);
      const nuevoMinisterio = {};

      fd.forEach((value, key) => {
         nuevoMinisterio[key] = value;
      });
      await insertarMinisterioAPI(
         {
            nombre: nuevoMinisterio.nombre,
            descripcion: nuevoMinisterio.descripcion,
         },
         (response) => {
            console.log(JSON.stringify(response.data));
            toast.success('Ministerio agregado');
         },
         (error) => {
            console.log(error);
            toast.error('Error agregando Ministerio');
         }
      );
      console.log('setMostrarTablaMin: ', context.setMostrarTablaMin);

      context.setMostrarTablaMin(true);
   };

   return (
      <div>
         <h2 className='text-2xl font-extrabold mb-6'>
            Crear Nuevo Ministerio
         </h2>
         <form ref={form} name='formMinisterio' onSubmit={onSubmitForm}>
            <input type='hidden' name='id_ministerio' id='id_ministerio' />
            <label htmlFor='nombre' className='flex flex-col'>
               Nombre
               <input
                  type='text'
                  name='nombre'
                  id='nombre'
                  placeholder='Comunicación'
                  required
                  className='border border-gray-500 p-2 mt-2 mb-3 rounded-lg focus:outline-none focus:border-indigo-500'
               />
            </label>
            <label htmlFor='descripcion' className='flex flex-col'>
               Descripcion
               <input
                  type='text'
                  name='descripcion'
                  id='descripcion'
                  placeholder='Transmi'
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
