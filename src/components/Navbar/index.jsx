import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

// Contexto
import { ShalomContext } from '../../Context';

export const Navbar = () => {
   // Crear contexto
   const context = useContext(ShalomContext);

   // Estilos opción Navbar activo
   const activeStyle = 'underline underline-offset-4';
   return (
      <nav className='fixed z-10 border w-full top-0 py-5 px-4 bg-white'>
         <ul className='flex items-center gap-3'>
            <li className='font-bold text-lg'>
               <NavLink
                  to='/'
                  className={({ isActive }) =>
                     isActive ? activeStyle : undefined
                  }
               >
                  Shalom
               </NavLink>
            </li>
            <li>
               <NavLink
                  to='/miembros'
                  className={({ isActive }) =>
                     isActive ? activeStyle : undefined
                  }
               >
                  Miembros
               </NavLink>
            </li>
            <li>
               <NavLink
                  to='/ministerios'
                  className={({ isActive }) =>
                     isActive ? activeStyle : undefined
                  }
               >
                  Ministerios
               </NavLink>
            </li>
            <li>
               <NavLink
                  to='/miem_mini'
                  className={({ isActive }) =>
                     isActive ? activeStyle : undefined
                  }
               >
                  Miem/Minis
               </NavLink>
            </li>
            <li>
               <NavLink
                  to='/logout'
                  className={({ isActive }) =>
                     isActive ? activeStyle : undefined
                  }
               >
                  Salir
               </NavLink>
            </li>
            <li className='w-full flex justify-end items-center text-xl font-semibold'>
               {context.loggedUser}
            </li>
         </ul>
      </nav>
   );
};
