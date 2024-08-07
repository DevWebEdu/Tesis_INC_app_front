import React, { useEffect } from 'react'
import clienteAxios from '../config/axios'
import { useNavigate } from 'react-router-dom'
import useSWR from 'swr'

const useAuth = ({middleware,url}) => {
    const navigate = useNavigate()

    const token = localStorage.getItem('AUTH_TOKEN')

    const {data:user , error,mutate } = useSWR('/api/user',()=>
        clienteAxios('/api/user',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then(res=>res.data)
        .catch(error => {
            throw Error(error?.response?.data?.errors)
        })
    )

    const login = async(datos,setErrores) =>{
        try {
            const {data} = await clienteAxios.post('/api/login',datos)
            
             localStorage.setItem('AUTH_TOKEN', data.token)
             
            setErrores([])
            // volver a llamar a SWR
            
            await mutate()
        } catch (error) {
            setErrores(Object.values(error?.response?.data?.errors))
        }
    }


    const logout = async() =>{
        try {
           await clienteAxios.post('/api/logout',null,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
           })
           localStorage.removeItem('AUTH_TOKEN')
           navigate('/auth/login')
           mutate(undefined)
        } catch (error) {
            throw Error(error?.response?.data?.errors)
        }
    }

    useEffect(()=>{
        if(middleware=== 'worker' && url && user ){
            navigate(url)
        }
        if(middleware === 'auth'  && error){
            navigate('/auth/login')
        }
    },[user,error])

  return {
    login,
    user,
    logout
  }
}

export default useAuth
