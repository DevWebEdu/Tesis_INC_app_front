import React from 'react'
import CardAtention from '../components/CardAtention'

const Dashboard = () => {

  const atencion_actual = [{
    time_atcn: "20:10",
    user: "lyactayo",
    inc: "INC98751536",

  },
  {
    time_atcn: "20:10",
    user: "lyactayo",
    inc: "INC98751536",

  },
  {
    time_atcn: "20:10",
    user: "lyactayo",
    inc: "INC98751536",

  },
  {
    time_atcn: "20:10",
    user: "lyactayo",
    inc: "INC98751536",

  }, {
    time_atcn: "20:10",
    user: "lyactayo",
    inc: "INC98751536",

  },
  {
    time_atcn: "20:10",
    user: "lyactayo",
    inc: "INC98751536",

  },
  {
    time_atcn: "20:10",
    user: "lyactayo",
    inc: "INC98751536",

  },
  {
    time_atcn: "20:10",
    user: "lyactayo",
    inc: "INC98751536",

  }
  ]

  return (
    <>
      <h1 className='text-2xl md:text-4xl font-black mt-4 ' >¿Que Incidencia Atenderás? </h1>
      <p className="text-xl   md:text-2xl my-10">
        Ingresa el codigo de tu incidencia próxima a atender.
      </p>
      <div>
        <form action="" className=' md:w-1/2 w-full'>
          <div className='mb-4 '>
            <label htmlFor="cod_inc" className='text-slate-800'>Codigo de Incidencia:</label>
            <input type="text" id='cod_inc' className='mt-2 w-full p-3  rounded-md outline-none border-2  border-regal-blue' name='cod_inc' placeholder='INC000999999' />
          </div>
          {/* Este boton a parte de validar si ya esta siendo atendida la incidencia, en el caso de que no este atendida llevara al usuario a una vista donde podra ingresar los datos de atencion de la incidencia - Indicador de doble atencion validador si la atencion ya esta siendo atendida - Indicador de redaccion de incidencia al momento que envia al usuario a la nueva vista */}
          <input type="submit" value='Atender!!' className='bg-regal-blue hover:bg-hover-regal rounded-md text-white w-full  p-3 uppercase font-bold cursor-pointer' />
        </form>
        {/* Crear del apartado para visualizar las incidencias  */}
        <section
          className='mt-5 py-5'
        >
          <h3 className='text-base font-black' >Se estan resolviendo las incidencias</h3>

          <div className='grid grid-cols-4 gap-4 mt-5' >
            {/* En este apartado conjuntamente con el Backent y la tabla inc-atencion estaran solo las  inc que esten en estado 1 , lo que significa que estan siendo atendidas en ese momento, por otro lado las que tengan estado 2 son las que ya fueron atendidas y deben estar en la tabla inc-atendidas */}
            {
              atencion_actual.map((atention, i) => (
                <CardAtention atention={atention} key={i} />
              ))
            }


          </div>
        </section>
      </div>
    </>
  )
}

export default Dashboard
