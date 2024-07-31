// Componentes React
import { useEffect, useContext } from 'react';

// Contexto
import { ShalomContext } from '../../Context';

// Componente Miembros - Ministerios
import { FormularioMiembrosMinisterios } from '../../components/MiembrosMinisterios/FormularioMiembrosMinisterios';
import { TablaMiembrosMinisterios } from '../../components/MiembrosMinisterios/TablaMiembrosMinisterios';

// API
import { consultarMiembrosMinisteriosAPI } from '../../utils/api';

// Componentes
import { Layout } from '../../components/Layout';

// Mensajes pop-pup
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const MiembrosMinisterios = () => {
   // Crear contexto
   const context = useContext(ShalomContext);

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
   }, [context.ejecutarConsultaMieMin]);

   useEffect(() => {
      if (context.mostrarTablaMieMin) {
         context.setEjecutarConsultaMieMin(true);
      }
   }, [context.mostrarTablaMieMin]);

   return (
      <Layout>
         <div className='flex flex-col h-full w-full items-center justify-center'>
            <div className='flex flex-col mb-12'>
               <h2 className='text-3xl font-extrabold text-center'>
                  Miembros - Ministerios
               </h2>
               <button
                  onClick={() => {
                     context.setMostrarTablaMieMin(!context.mostrarTablaMieMin);
                  }}
                  className={`${context.colorBotonMieMin} text-white rounded-full p-5 mt-6 h-28 w-28 self-end`}
               >
                  {context.textoBotonMieMin}
               </button>
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
