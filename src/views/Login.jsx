import React from 'react'

const Login = () => {
  return (
    <>
            <h1 className='text-4xl font-black'>
                Inicia Sesion
            </h1>
            <p> Para comenzar a gestionar tus Incidencias necesitas inciar sesion</p>
            <div className='bg-white  mt-6  py-10'>
                <form >

                    <div className='mb-4'>
                        <label htmlFor="user" className='text-slate-800'>Usuario:</label>
                        <input type="text" id='user' className='mt-2 w-full p-3 bg-gray-50' name='user' placeholder='Tu Usuario' />
                    </div>

                    <div className='mb-4'>
                        <label htmlFor="password" className='text-slate-800'>Password:</label>
                        <input type="password" id='password' className='mt-2 w-full p-3 bg-gray-50' name='password' placeholder='Tu Contraseña' />
                    </div>

                    <input type="submit" value='Iniciar Sesion' className='bg-green-500 hover:bg-green-700 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer' />
                </form>
            </div>

        </>
  )
}

export default Login
Login