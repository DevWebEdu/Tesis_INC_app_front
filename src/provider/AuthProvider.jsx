
import AuthContext from "../context/AuthContext"
import clienteAxios from "../config/axios"
import useSWR from "swr"
import { useEffect, useState } from "react"
import { redirect, useNavigate } from "react-router-dom"




export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    

    const token = localStorage.getItem('AUTH_TOKEN')

    const login  = async(datos, setErrores) => {
        try {
            const {data} = await clienteAxios.post('/api/login',datos)
            const {token,user} = data
            localStorage.setItem('AUTH_TOKEN',token)
            setErrores([])
            setUser(user)
            // await mutate()
        }catch (error) {
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
           setUser(null)
        //    mutate(undefined)
        } catch (error) {
            throw Error(error?.response?.data?.errors)
        }
    }
  return (
    <AuthContext.Provider  value={{login,user,logout,token,setUser}}>
        { children }
    </AuthContext.Provider>
  )
}
