import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar'

const DashboardLayout = () => {
  return (
    <div className='md:flex  bg-indigo-200'>
        <SideBar/>
        <div className='w-full container mx-auto p-3'>
        <Outlet/>
        </div>
        
    </div>
  )
}

export default DashboardLayout
