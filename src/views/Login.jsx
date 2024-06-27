import React, { createRef, useState } from 'react'
import useAuth from '../hooks/useAuth'
import Alerta from '../components/Alerta'

const Login = () => {

    const usernameRef = createRef()
    const passwordRef = createRef()
    const [errores,setErrores] = useState([])
    const {login} = useAuth({
        middleware : 'worker',
        url:'/'
    })


    const handleSubmit =  e => {
        e.preventDefault()

        const datos ={
            username :  usernameRef.current.value,
            password  :  passwordRef.current.value
        }
       login ( datos, setErrores)
    }   

  return (
    <>
            <h1 className='text-4xl font-black'>
                Inicia Sesion
            </h1>
            <p> Para comenzar a gestionar tus Incidencias necesitas inciar sesion</p>
            <div className='bg-white  mt-6  py-10'>
                <form 
                noValidate
                onSubmit={handleSubmit}
                >
                    {
                        errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null
                    }
                    <div className='mb-4'>
                        <label htmlFor="username" className='text-slate-800'>Usuario:</label>
                        <input type="text" id='username' className='mt-2 w-full p-3 bg-gray-50' name='username'  ref={usernameRef}  placeholder='Tu Usuario' />
                    </div>

                    <div className='mb-4'>
                        <label htmlFor="password" className='text-slate-800'>Password:</label>
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