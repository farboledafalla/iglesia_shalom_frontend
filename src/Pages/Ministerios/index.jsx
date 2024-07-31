// Componentes React
import { useEffect, useContext } from 'react';

// Contexto
import { ShalomContext } from '../../Context';

// API
import { consultarMinisteriosAPI } from '../../utils/api';

// Componentes Miembros
import { TablaMinisterios } from '../../components/Ministerios/TablaMinisterios';
import { FormularioMinisterios } from '../../components/Ministerios/FormularioMinisterios';

// Componentes
import { Layout } from '../../components/Layout';

// Mensajes pop-pup
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Ministerios = () => {
   // Crear contexto
   const context = useContext(ShalomContext);

   // Cambiar texto y color botón
   useEffect(() => {
      if (context.mostrarTablaMin) {
         context.setTextoBotonMin('Agregar Miembro');
         context.setColorBotonMin('bg-green-500');
      } else {
         context.setTextoBotonMin('Mostrar Miembros');
         context.setColorBotonMin('bg-indigo-500');
      }
   }, [context.mostrarTablaMin]);

   // Solicitar ejecutar consulta
   useEffect(() => {
      if (context.mostrarTablaMin) {
         context.setEjecutarConsultaMin(true);
      }
   }, [context.mostrarTablaMin]);

   // Ejecutar consulta al API
   useEffect(() => {
      const consultarMinisterios = async () => {
         await consultarMinisteriosAPI(
            (response) => {
               // console.log(JSON.stringify(response.data));
               context.setMinisterios(response.data);
               context.setEjecutarConsultaMin(false);
            },
            (error) => {
               console.log('Salio un error: ', error);
            }
         );
      };

      if (context.ejecutarConsultaMin) {
         consultarMinisterios();
      }
   }, [context.ejecutarConsultaMin]);

   return (
      <Layout>
         <div className='flex flex-col h-full w-full items-center justify-center'>
            <div className='flex flex-col mb-12'>
               <h2 className='text-3xl font-extrabold text-center'>
                  Administración de Ministerios
               </h2>
               <button
                  onClick={() => {
                     context.setMostrarTablaMin(!context.mostrarTablaMin);
                  }}
                  className={`${context.colorBotonMin} text-white rounded-full p-5 mt-6 h-28 w-28 self-end`}
               >
                  {context.textoBotonMin}
               </button>
            </div>
            {context.mostrarTablaMin ? (
               <TablaMinisterios ministerios={context.ministerios} />
            ) : (
               <FormularioMinisterios />
            )}
            <ToastContainer position='bottom-center' autoClose={3000} />
         </div>
      </Layout>
   );
};
