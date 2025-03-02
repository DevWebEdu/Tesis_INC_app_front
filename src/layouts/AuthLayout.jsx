import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <main className= 'dark:bg-color-layout-dark min-h-screen mx-auto bg-color-layour-light   flex flex-col md:flex-row items-center shadow-md  justify-center '>
      <img src="../assets/40467511_8716346.svg" alt="Imagen Logeo"  className='max-w-xs md:max-w-sm dark:bg-color-layout-dark dark:text-tcolor-dark text-white' />
      <div className='p-10 '>
        <Outlet/>
      </div>
    </main>
  )
}

export default AuthLayout
