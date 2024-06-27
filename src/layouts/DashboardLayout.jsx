import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar'
import useAuth from '../hooks/useAuth'

const DashboardLayout = () => {

  const {user,error } = useAuth({
    middleware:'auth'
  })
  return (
    <div className='flex  '>
        <SideBar/>
        <div className='w-full  p-5  '>
        <Outlet/>
        </div>
        
    </div>
  )
}

export default DashboardLayout
