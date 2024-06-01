import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar'

const DashboardLayout = () => {
  return (
    <div className='md:flex  '>
        <SideBar/>
        <div className='w-full  p-3 bg-slate-00 '>
        <Outlet/>
        </div>
        
    </div>
  )
}

export default DashboardLayout
