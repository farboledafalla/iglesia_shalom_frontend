import { useState, useEffect } from 'react';
import axios from 'axios';

export const usePaginatedFetch = (url, initialPage = 1, limit = 2) => {
   const [data, setData] = useState([]);
   const [currentPage, setCurrentPage] = useState(initialPage);
   const [totalPages, setTotalPages] = useState(0);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         setLoading(true);
         try {
            const response = await axios.get(url, {
               params: {
                  page: currentPage,
                  limit: limit,
               },
            });
            setData(response.data.results);
            setTotalPages(response.data.totalPages);
         } catch (error) {
            console.error('Error fetching data:', error);
         }
         setLoading(false);
      };

      fetchData();
   }, [url, currentPage, limit]);

   return { data, currentPage, totalPages, loading, setCurrentPage };
};
