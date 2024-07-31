// Componentes React
import { createContext, useState } from 'react';

// PropsTypes
import PropTypes from 'prop-types';

export const ShalomContext = createContext();

export const ShalomProvider = ({ children }) => {
   // Estados componente Miembros
   const [mostrarTabla, setMostrarTabla] = useState(true);
   const [textoBoton, setTextoBoton] = useState('Agregar Miembro');
   const [colorBoton, setColorBoton] = useState('bg-green-500');
   const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
   const [miembros, setMiembros] = useState([]);

   // Estados componente Ministerios
   const [mostrarTablaMin, setMostrarTablaMin] = useState(true);
   const [textoBotonMin, setTextoBotonMin] = useState('Agregar Ministerio');
   const [colorBotonMin, setColorBotonMin] = useState('bg-green-500');
   const [ejecutarConsultaMin, setEjecutarConsultaMin] = useState(true);
   const [ministerios, setMinisterios] = useState([]);

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
            mostrarTablaMin,
            setMostrarTablaMin,
            textoBotonMin,
            setTextoBotonMin,
            colorBotonMin,
            setColorBotonMin,
            ejecutarConsultaMin,
            setEjecutarConsultaMin,
            ministerios,
            setMinisterios,
         }}
      >
         {children}
      </ShalomContext.Provider>
   );
};

ShalomProvider.propTypes = {
   children: PropTypes.func,
};
