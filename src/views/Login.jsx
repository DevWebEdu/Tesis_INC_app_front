import React, { createRef, useEffect, useState } from 'react'
import useAuth1 from '../hooks/useAuth1'
import Alerta from '../components/Alerta'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const usernameRef = createRef()
    const passwordRef = createRef()
    const [errores,setErrores] = useState([])
    const {login,user,token} = useAuth1()
    const navigate = useNavigate()

    

    const handleSubmit =  e => {
        e.preventDefault()

        const datos ={
            username :  usernameRef.current.value,
            password  :  passwordRef.current.value
        }
       login ( datos, setErrores)
       
    }   

    useEffect(()=>{
        if(user){
            navigate('/')
        }
        if(token){
            navigate('/')
        }
    },[user,token])


  return (
    <>
            <h1 className='text-4xl font-black dark:text-tcolor-dark'>
                Inicia Sesion
            </h1>
            <p className='dark:text-tcolor-dark '> Para comenzar a gestionar tus Incidencias necesitas inciar sesion </p>
            <div className='bg-white  mt-6  py-10 dark:bg-color-layout-dark'>
                <form 
                noValidate
                onSubmit={handleSubmit}
                >
                    {
                        errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null
                    }
                    <div className='mb-4'>
                        <label htmlFor="username" className='text-slate-800 dark:text-tcolor-dark'>Usuario:</label>
                        <input type="text" id='username' className='mt-2 w-full p-3 bg-gray-50' name='username'  ref={usernameRef}  placeholder='Tu Usuario' />
                    </div>

                    <div className='mb-4'>
                        <label htmlFor="password" className='text-slate-800 dark:text-tcolor-dark'>Password:</label>
                        <input type="password" id='password' className='mt-2 w-full p-3 bg-gray-50' name='password' ref={passwordRef}  placeholder='Tu Contraseña' />
                    </div>

                    <input type="submit" value='Iniciar Sesion' className='bg-green-500 hover:bg-green-700 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer' />
                </form>
            </div>

        </>
  )
}

export default Login
Login