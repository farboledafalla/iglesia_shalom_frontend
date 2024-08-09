// Componentes React
import { useRoutes, BrowserRouter } from 'react-router-dom';

// Contexto
import { ShalomProvider } from '../../Context/';

// Pages
import { Home } from '../Home';
import { Miembros } from '../Miembros';
import { Ministerios } from '../Ministerios';
import { MiembrosMinisterios } from '../MiembrosMinisterios';
import { NotFound } from '../NotFound';
import { Register } from '../Auth/Register';
import { ProtectedRoute } from '../Auth/ProtectedRoute';
import { Login } from '../Auth/Login';

// Componentes
import { Navbar } from '../../components/Navbar';

import './App.css';

// Rutas
const AppRoutes = () => {
   let routes = useRoutes([
      {
         path: '/',
         element: (
            <ProtectedRoute>
               <Home />
            </ProtectedRoute>
         ),
      },
      {
         path: '/register',
         element: <Register />,
      },
      {
         path: '/login',
         element: <Login />,
      },
      {
         path: '/miembros',
         element: (
            <ProtectedRoute>
               <Miembros />
            </ProtectedRoute>
         ),
      },
      {
         path: '/ministerios',
         element: (
            <ProtectedRoute>
               <Ministerios />
            </ProtectedRoute>
         ),
      },
      {
         path: '/miem_mini',
         element: (
            <ProtectedRoute>
               <MiembrosMinisterios />
            </ProtectedRoute>
         ),
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
      <ShalomProvider>
         <BrowserRouter>
            <AppRoutes />
            <Navbar />
         </BrowserRouter>
      </ShalomProvider>
   );
};
