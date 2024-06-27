import React, { useEffect } from 'react'
import clienteAxios from '../config/axios'
import useSWR from 'swr'

const useIncidencias = () => {
    const token = localStorage.getItem('AUTH_TOKEN')

    const fetcher = async() =>{
        const data  =  await clienteAxios.get('/api/finding',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        return data
    }

    const {data,error,isLoading} = useSWR('/api/incidencias,',fetcher)

    const insertarIncidencia = async (id,datos,setErrores)  =>{
        try {
          const data = await clienteAxios.put(`/api/incidencias/${id}`,datos,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
  
          )
          setErrores([])
          return data
        } catch (error) {
          setErrores(Object.values(error?.response?.data?.errors))
        }
    } 

  
    const filtrarIncidencias = async( datos )=>{
      try {
          const {data} = await clienteAxios.post(`/api/finding`,datos,
            {
              headers : {
                Authorization : `Bearer ${token}`
              }
            }
          )
          return data
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {

    }, [data])
    
  return {
    data,
    isLoading,
    error,
    filtrarIncidencias,
    insertarIncidencia
  }
}

export default useIncidencias
