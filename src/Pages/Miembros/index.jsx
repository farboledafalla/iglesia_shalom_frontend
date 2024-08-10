// Componentes React
import { useEffect, useContext } from 'react';

// Contexto
import { ShalomContext } from '../../Context';

// Componentes
import { Layout } from '../../components/Layout';
import { TablaMiembros } from '../../components/Miembros/TablaMiembros';
import { FormularioMiembros } from '../../components/Miembros/FormularioMiembros';

// Mensajes pop-pup
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// API
import { consultarMiembrosAPI } from '../../utils/api';

export const Miembros = () => {
   // Crear contexto
   const context = useContext(ShalomContext);

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
