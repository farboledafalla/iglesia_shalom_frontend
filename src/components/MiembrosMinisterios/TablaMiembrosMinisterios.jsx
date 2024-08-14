import { useEffect, useState } from 'react';

// Componentes Miembros - Ministerios
import { FilaMiembroMinisterio } from './FilaMiembroMinisterio';

// Librerias
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import axios from 'axios';

export const TablaMiembrosMinisterios = ({ miembrosMinisterios }) => {
   const [miemMini, setMiemMini] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(0);

   useEffect(() => {
      fetchMiemMini(currentPage);
   }, [currentPage]);

   const fetchMiemMini = async (page) => {
      try {
         const response = await axios.get(
            'http://localhost:3000/api/pag_miembros_ministerios',
            {
               params: {
                  page: page,
                  limit: 3,
               },
            }
         );
         console.log(response.data);
         setMiemMini(response.data.rows);
         setTotalPages(response.data.totalPages);
      } catch (error) {
         console.error('Error fetching miembros ministerios:', error);
      }
   };

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

   return (
      <div className='flex flex-col items-center justify-center'>
         <h3 className='text-2xl font-extrabold'>
            Listado de Miembros - Ministerios
         </h3>
         <table className='tabla'>
            <thead>
               <tr>
                  <th>Miembro</th>
                  <th>Ministerio</th>
                  <th>Ingreso</th>
                  <th>Retiro</th>
                  <th>Acciones</th>
                  {/* <th>Apellidos</th>
                  <th>Celular</th> */}
               </tr>
            </thead>
            <tbody>
               {miemMini.map((miembroMinisterio) => {
                  return (
                     <FilaMiembroMinisterio
                        key={nanoid()}
                        miembroMinisterio={miembroMinisterio}
                        // onUpdateMiembro={onUpdateMiembro}
                        // onDeleteMiembro={onDeleteMiembro}
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

TablaMiembrosMinisterios.propTypes = {
   miembrosMinisterios: PropTypes.array,
};
