import { useEffect } from 'react';

export const useFocusInput = (inputRef) => {
   useEffect(() => {
      if (inputRef.current) {
         inputRef.current.focus();
      }
   }, [inputRef]);
};
