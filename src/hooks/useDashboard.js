import React, { useEffect, useState } from 'react'
import clienteAxios from '../config/axios'
import useSWR from 'swr'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const useDashboard = () => {
    const navigate = useNavigate()
    //capturamos el token 
    const token = localStorage.getItem('AUTH_TOKEN')
    

    

    const  AgregarIncidenciaDashboard = async( datos,setErrores ) =>{
        try {
            const {data}  =await clienteAxios.post('/api/dashboard',datos,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
           
            setErrores([])           
          navigate('/')
            return data
        } catch (error) {
            setErrores(Object.values(error?.response?.data?.errors))
            //console.log(Object.values(error?.response?.data?.errors))
        }
    }

    const consultarIncidenciaDashboard = async (id) => {
        try {
            const {data} = await clienteAxios.get(`/api/dashboard/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            return data
        } catch (error) {
           console.log(error)
        }
    }

    const eliminandoIncidencia = async(id) => {
        try {
            const {data} = await clienteAxios.delete(`/api/dashboard/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            return data
        } catch (error) {
            console.log(error)
        }
    }

    

    return {
        AgregarIncidenciaDashboard,
        consultarIncidenciaDashboard,
        eliminandoIncidencia
    }
}

export default useDashboard
