import React from 'react'
import LinkModule from './LinkModule'
import HelpersAccount from './HelpersAccount'


const SideBar = () => {

  const links = [
    {
      id:1,
      path:'/',
      name : 'Dashboard'
    },
    {
      id:2,
      path:'/incs',
      name:'Incidencias'
    },
    {
      id:3,
      path:'/users',
      name: 'Usuarios'
    }
  ]



  return (
    <div className='  md:w-72 hidden h-lvh shadow-2xl rounded-lg md:flex md:flex-col   '>
      {/* Cambio de Tema y Cerrar Sesion Crear Componente <HelpersAccount/> */}
      <HelpersAccount/>


      <div className='py-10 mb-10 mx-auto  '>
      <img src="../assets/user-icon-svgrepo-com.svg" alt="imagen_usuario" className=' w-full max-w-[120x]' />
      </div>
      
      
      {/* Lista de Navegacion Nav - Links */}
      <nav className=' mt-10 flex flex-col  w-full '>
        {/* Vista link.name = 'users'  proximamente solo habilitada para el perfil modo admin */}  
        {
          links.map(link=>(  
            <LinkModule link={link} key={link.id}/>
          ))
        }
      </nav>
    </div>
  )
}

export default SideBar
