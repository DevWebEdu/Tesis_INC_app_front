import React from 'react'
import clienteAxios from '../config/axios'

export const useWorkers = () => {
    const token = localStorage.getItem('AUTH_TOKEN')

  const getWorkers= async() =>{
    const {data} = await clienteAxios.get('/api/workers',{
        headers : {
            Authorization : `Bearer ${token}`
        }
    })

    return data
  }

  const turnOnOffAdminWorkers = async(id) => {
    const  {data} = await clienteAxios.put(`/api/turnadmin/${id}`,{}, {
      headers : {
        Authorization : `Bearer ${token}`
      }
    })
    
    return data
  }

  const getWorker = async(id) => {
    const {data} = await clienteAxios.get(`/api/workers/${id}`,{
      headers :{
        Authorization : `Bearer ${token}`
      }
    })
    return data
  }

  const getIncsFromWorkers = async(id) => {
    const data = await clienteAxios.get(`/api/getincsfromworker/${id}`,{
      headers:{
        Authorization : `Bearer ${token}`
      }
    })

    return data
  }


  return {
    getWorkers,
    turnOnOffAdminWorkers,
    getWorker,
    getIncsFromWorkers
  }
}
