// Componentes React
import { useContext, useRef } from 'react';

// Contexto
import { ShalomContext } from '../../Context';

// API
import { insertarMiembroAPI } from '../../utils/api';

// Mensajes pop-pup
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const FormularioMiembros = () => {
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

   return (
      <div>
         <h2 className='text-2xl font-extrabold mb-6'>Crear Nuevo Miembro</h2>
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
