// Componentes React
import { useRoutes, BrowserRouter } from 'react-router-dom';

// Pages
import { Home } from '../Home';
import { Miembros } from '../Miembros';
import { Ministerios } from '../Ministerios';
import { MiembrosMinisterios } from '../MiembrosMinisterios';
import { NotFound } from '../NotFound';

// Componentes
import { Navbar } from '../../components/Navbar';

import './App.css';

// Rutas
const AppRoutes = () => {
   let routes = useRoutes([
      {
         path: '/',
         element: <Home />,
      },
      {
         path: '/miembros',
         element: <Miembros />,
      },
      {
         path: '/ministerios',
         element: <Ministerios />,
      },
      {
         path: '/miem_mini',
         element: <MiembrosMinisterios />,
      },
      {
         path: '/*',
         element: <NotFound />,
      },
   ]);
   return routes;
};

export const App = () => {
   return (
      <BrowserRouter>
         <AppRoutes />
         <Navbar />
      </BrowserRouter>
   );
};
