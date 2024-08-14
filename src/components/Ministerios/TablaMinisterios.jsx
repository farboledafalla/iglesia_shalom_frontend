import { useContext } from 'react';

// Hooks personalizados
import { usePaginatedFetch } from '../../Hooks/usePaginatedFetch';

// Contexto
import { ShalomContext } from '../../Context';

// API
import { editarMinisterioAPI, eliminarMinisterioAPI } from '../../utils/api';

// Componentes Ministerios
import { FilaMinisterio } from './FilaMinisterio';

// Mensajes pop-pup
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Librerias
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

export const TablaMinisterios = ({ ministerios }) => {
   // Crear contexto
   const context = useContext(ShalomContext);

   const {
      data: ministeries,
      currentPage,
      totalPages,
      loading,
      setCurrentPage,
   } = usePaginatedFetch('http://localhost:3000/api/pag_ministerios', 1, 3);

   const handlePageChange = (page) => {
      setCurrentPage(page);
   };

   const renderPageNumbers = () => {
      const pageNumbers = [];

      // Mostrar siempre la primera página
      if (currentPage > 3) {
         pageNumbers.push(1);
         if (currentPage > 4) {
            pageNumbers.push('...');
         }
      }

      // Páginas intermedias
      for (
         let i = Math.max(2, currentPage - 2);
         i <= Math.min(totalPages - 1, currentPage + 2);
         i++
      ) {
         pageNumbers.push(i);
      }

      // Mostrar siempre la última página
      if (currentPage < totalPages - 2) {
         if (currentPage < totalPages - 3) {
            pageNumbers.push('...');
         }
         pageNumbers.push(totalPages);
      }

      return pageNumbers.map((page, index) => (
         <button
            key={index}
            onClick={() => handlePageChange(page)}
            disabled={page === currentPage || page === '...'}
            className='bg-slate-700 text-white px-2 mx-1'
         >
            {page}
         </button>
      ));
   };

   if (loading) {
      return <p>Loading...</p>;
   }

   // Actualizar
   const onUpdateMinisterio = async (ministerioActualizado) => {
      await editarMinisterioAPI(
         ministerioActualizado.id_ministerio,
         {
            nombre: ministerioActualizado.nombre,
            descripcion: ministerioActualizado.descripcion,
         },
         (response) => {
            console.log(JSON.stringify(response.data));
            toast.success('Ministerio actualizado');
            context.setEjecutarConsultaMin(true);
         },
         (error) => {
            console.log(error);
            toast.error('Error actualizando Ministerio');
         }
      );
   };

   // Eliminar
   const onDeleteMinisterio = async (ministerioAEliminar) => {
      await eliminarMinisterioAPI(
         ministerioAEliminar.id_ministerio,
         (response) => {
            console.log(JSON.stringify(response.data));
            toast.success('Ministerio Eliminado');
            // Para que cargue los nuevos valores
            context.setEjecutarConsultaMin(true);
         },
         (error) => {
            console.log(error);
            toast.error(error.response.data.status);
         }
      );
   };

   return (
      <div className='flex flex-col items-center justify-center'>
         <h3 className='text-2xl font-extrabold'>Listado de Ministerios</h3>
         <table className='tabla'>
            <thead>
               <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
               </tr>
            </thead>
            <tbody>
               {ministeries.map((ministerio) => {
                  return (
                     <FilaMinisterio
                        key={nanoid()}
                        ministerio={ministerio}
                        onUpdateMinisterio={onUpdateMinisterio}
                        onDeleteMinisterio={onDeleteMinisterio}
                     />
                  );
               })}
            </tbody>
         </table>
         <div>
            <button
               onClick={() => handlePageChange(currentPage - 1)}
               disabled={currentPage === 1}
               className='bg-slate-700 text-white px-2 mx-1'
            >
               Prev
            </button>

            {renderPageNumbers()}

            {/* Botón para ir a la página siguiente */}
            <button
               onClick={() => handlePageChange(currentPage + 1)}
               disabled={currentPage === totalPages}
               className='bg-slate-700 text-white px-2 mx-1'
            >
               Next
            </button>
         </div>
      </div>
   );
};

TablaMinisterios.propTypes = {
   ministerios: PropTypes.array,
};
