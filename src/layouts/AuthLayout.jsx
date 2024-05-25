import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <main className='max-w-5xl m-auto mt-10 md:mt-28  flex flex-col md:flex-row items-center shadow-md rounded-md '>
      <img src="../assets/imagen-login.jpg" alt="Imagen Logeo"  className='max-w-xs md:max-w-sm '/>
      <div className='p-10 w-full'>
        <Outlet/>
      </div>
    </main>
  )
}

export default AuthLayout
