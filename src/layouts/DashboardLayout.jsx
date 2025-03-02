import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar'

import useAuth1 from '../hooks/useAuth1'

const DashboardLayout = () => {

  return (
    <div className='flex dark:bg-color-layout-dark min-h-screen  bg-color-layour-light'>
        <SideBar/>
        <div className='container mx-10 sm:mx-auto mt-16'>
        <Outlet/>
        </div>
          
    </div>
  )
}

export default DashboardLayout
