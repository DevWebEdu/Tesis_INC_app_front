import React, { useEffect, useState } from 'react'
import { Sun, Moon, LogOut } from "lucide-react";

import useAuth1 from '../hooks/useAuth1';

const HelpersAccount = () => {
  const {logout} = useAuth1()
  const  [theme,setTheme] = useState(()=>localStorage.getItem("theme")||"light")
  
   // Aplicar el tema al cargar el componente y cuando se cambia
   useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark"); // Agregar la clase "dark" al <html>
    } else {
      document.documentElement.classList.remove("dark"); // Quitar la clase "dark" del <html>
    }
    localStorage.setItem("theme", theme); // Guardar el tema en localStorage
  }, [theme]); // Se ejecuta cada vez que cambia `theme`

  return (
    <div className=' flex w-full justify-between px-5 py-10'>
        
        {/* Apartado para cambiar el tema night/day
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg>
        </button> */}
            <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")} // Alternar tema
          className={`p-2 rounded-lg  dark:bg-gray-800 bg-linksbg-color-light  `}     >
          {theme === "dark" ? <Sun className="w-6 h-6 text-yellow-500" /> : <Moon className="w-6 h-6 text-white " />}
        </button>

        {/* Apartado para Cerrar Sesion */}
        <button onClick={logout} >
            <LogOut />
        </button>
      </div>
  )
}

export default HelpersAccount
