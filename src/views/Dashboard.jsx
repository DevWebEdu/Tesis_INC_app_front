import React from 'react'

const Dashboard = () => {
  return (
    <>
      <h1 className='text-2xl md:text-4xl font-black mt-4 ' >¿Que Incidencia Atenderás? </h1>
      <p className="text-xl   md:text-2xl my-10">
        Ingresa el codigo de tu incidencia próxima a atender.
      </p>
      <div>
        <form action=""  className=' md:w-1/2 w-full'>
          <div className='mb-4 '>
            <label htmlFor="cod_inc" className='text-slate-800'>Codigo de Incidencia:</label>
            <input type="text" id='cod_inc' className='mt-2 w-full p-3 bg-gray-50 rounded-md' name='cod_inc' placeholder='INC000999999' />
          </div>
          <input type="submit" value='Atender!!' className='bg-indigo-400 hover:bg-indigo-600 rounded-md text-white w-full  p-3 uppercase font-bold cursor-pointer' />
        </form>

      </div>
    </>
  )
}

export default Dashboard
