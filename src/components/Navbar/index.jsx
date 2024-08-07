import { NavLink } from 'react-router-dom';

export const Navbar = () => {
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
                  to='/relacionar'
                  className={({ isActive }) =>
                     isActive ? activeStyle : undefined
                  }
               >
                  Relacionar
               </NavLink>
            </li>
         </ul>
      </nav>
   );
};
