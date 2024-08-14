// Componentes React
import { useContext } from 'react';

// Hooks personalizados
import { usePaginatedFetch } from '../../Hooks/usePaginatedFetch';

// Componentes Miembros
import { FilaMiembro } from './FilaMiembro';

// Contexto
import { ShalomContext } from '../../Context';

// API
import { editarMiembroAPI, eliminarMiembroAPI } from '../../utils/api';

// Mensajes pop-pup
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Librerias
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

export const TablaMiembros = ({ miembros }) => {
   // Crear contexto
   const context = useContext(ShalomContext);

   const {
      data: members,
      currentPage,
      totalPages,
      loading,
      setCurrentPage,
   } = usePaginatedFetch('http://localhost:3000/api/pag_miembros', 1, 3);

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
            toast.error(error.response.data.status);
         }
      );
   };

   return (
      <div className='flex flex-col items-center justify-center'>
         <h3 className='text-2xl font-extrabold'>Listado de Miembros</h3>
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
               {members.map((miembro) => {
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
         <div>
            <div>
               {/* {Array.from({ length: totalPages }, (_, index) => (
                  <button
                     key={index + 1}
                     onClick={() => handlePageChange(index + 1)}
                     disabled={currentPage === index + 1}
                     className='bg-slate-700 text-white px-2 mx-1 cursor-pointer'
                  >
                     {index + 1}
                  </button>
               ))} */}
               {/* Botón para ir a la página anterior */}
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
      </div>
   );
};

TablaMiembros.propTypes = {
   miembros: PropTypes.array,
};
