// Componentes React
import { useState, useEffect, useRef } from 'react';

// Componentes
import { Layout } from '../../components/Layout';

// Librerias
import axios from 'axios';

export const Miembros = () => {
   // Formulario
   const form = useRef(null);

   const onSubmitForm = async (event) => {
      event.preventDefault();

      const fd = new FormData(form.current);
      const nuevoMiembro = {};

      fd.forEach((value, key) => {
         nuevoMiembro[key] = value;
      });

      let data = JSON.stringify({
         cedula: nuevoMiembro.identificacion,
         nombres: nuevoMiembro.nombres,
         apellidos: nuevoMiembro.apellidos,
         celular: nuevoMiembro.celular,
      });

      let config = {
         method: 'post',
         maxBodyLength: Infinity,
         url: 'http://localhost:3000/api/miembros',
         headers: {
            'Content-Type': 'application/json',
         },
         data: data,
      };

      await axios
         .request(config)
         .then((response) => {
            console.log(JSON.stringify(response.data));
         })
         .catch((error) => {
            console.log(error);
         });

      setMostrarTabla(true);
   };

   // Estados
   const [mostrarTabla, setMostrarTabla] = useState(true);
   const [textoBoton, setTextoBoton] = useState('Agregar Miembro');
   const [colorBoton, setColorBoton] = useState('green');

   // Cambiar texto y color botón
   useEffect(() => {
      if (mostrarTabla) {
         setTextoBoton('Agregar Miembro');
         setColorBoton('bg-green-500');
      } else {
         setTextoBoton('Mostrar Miembros');
         setColorBoton('bg-indigo-500');
      }
   }, [mostrarTabla]);

   const TablaMiembros = () => {
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
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td>11111111</td>
                     <td>Franklim</td>
                     <td>Arboleda Falla</td>
                     <td>3208371159</td>
                  </tr>
                  <tr>
                     <td>22222222</td>
                     <td>Leidy Marcela</td>
                     <td>Marín Cárdenas</td>
                     <td>3208480575</td>
                  </tr>
               </tbody>
            </table>
         </div>
      );
   };

   const FormularioMiembros = () => {
      return (
         <div>
            <h2 className='text-2xl font-extrabold mb-6'>
               Crear Nuevo Miembro
            </h2>
            <form ref={form} name='formMiembro' onSubmit={onSubmitForm}>
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
                     setMostrarTabla(!mostrarTabla);
                  }}
                  className={`${colorBoton} text-white rounded-full p-5 mt-6 h-28 w-28 self-end`}
               >
                  {textoBoton}
               </button>
            </div>
            {mostrarTabla ? <TablaMiembros /> : <FormularioMiembros />}
         </div>
      </Layout>
   );
};
