import React, { useEffect, useState } from 'react'
import LinkModule from './LinkModule'
import HelpersAccount from './HelpersAccount'
import { links } from '../data/links_sidebar'
import { Menu, X } from "lucide-react";
import useAuth1 from '../hooks/useAuth1';

const SideBar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [linkini ,setLinks] = useState(links)
  const {user} = useAuth1();
  
    const determinarLinksByRol = (user,links) => {
      if(user?.admin == '0'){
         let linksWorker = links.filter(link=> link.name != 'Usuarios')
         setLinks(linksWorker)
      }else{
        setLinks(linkini)
      }      
    }
    

    

    useEffect(() => {
      determinarLinksByRol(user,linkini)

    }, [user]);

  return (

    <div className="relative ">
      
      {/* Botón de abrir/cerrar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-5 left-5 z-50  bg-regal-blue text-white p-2 rounded-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Fondo oscuro (overlay) */}
      {isOpen && (
        <div
            className="fixed inset-0 z-10 bg-black bg-opacity-50 transition-opacity duration-300"
            onClick={() => setIsOpen(false)} // Cierra el sidebar al hacer clic afuera
        ></div>
      )}

      {/* Sidebar con animación */}
      <aside
        className={` dark:bg-sidebarbg-color dark:text-tcolor-dark  shadow-2xl fixed z-20 top-0 left-0 w-72 h-full pt-20 bg-sidebarbg-color-light text-white p-6 
        transform transition-transform duration-1000 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className='flex flex-col  justify-center items-center h-full gap-5'>
          {/* Lista de Navegacion Nav - Links */}
          <nav className=' mt-10 flex flex-col  w-full '>
            {/* Vista link.name = 'users'  proximamente solo habilitada para el perfil modo admin */}
            {
              linkini.map(link => (
                <LinkModule link={link} key={link.id} />
              ))
            }
          </nav>
          <HelpersAccount />
        </div>

      </aside>
    </div>

  )
}

export default SideBar


