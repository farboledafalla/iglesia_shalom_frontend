// Componentes React
import { createContext, useState } from 'react';

// PropsTypes
import PropTypes from 'prop-types';

export const ShalomContext = createContext();

export const ShalomProvider = ({ children }) => {
   // Estados
   const [mostrarTabla, setMostrarTabla] = useState(true);
   const [textoBoton, setTextoBoton] = useState('Agregar Miembro');
   const [colorBoton, setColorBoton] = useState('bg-green-500');
   const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
   const [miembros, setMiembros] = useState([]);

   return (
      <ShalomContext.Provider
         value={{
            mostrarTabla,
            setMostrarTabla,
            textoBoton,
            setTextoBoton,
            colorBoton,
            setColorBoton,
            ejecutarConsulta,
            setEjecutarConsulta,
            miembros,
            setMiembros,
         }}
      >
         {children}
      </ShalomContext.Provider>
   );
};

ShalomProvider.propTypes = {
   children: PropTypes.func,
};
