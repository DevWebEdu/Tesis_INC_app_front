import React, { createRef, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useDashboard from '../hooks/useDashboard'
import useIncidencias from '../hooks/useIncidencias'
import Swal from 'sweetalert2'
import Alerta from '../components/Alerta'
import { Cronometer } from '../components/Cronometer'
import { useTiming } from '../hooks/useTiming'

const IncEdit = () => {
  const navigate = useNavigate()
  const { inc_id } = useParams()
  const { consultarIncidenciaDashboard } = useDashboard()
  const { insertarIncidencia } = useIncidencias()
  const { agregandoDataCronometrada } = useTiming()
  const [errores, setErrores] = useState([])
  const [incidencia, setIncidencia] = useState(null)
  const [tiempoRedaccion, setTiempoRedaccion] = useState({ 'minutes': 0, 'seconds': 0 })
  const codIncRef = createRef()

  const resumenRef = createRef()
  const notaRef = createRef()
  const observacionRef = createRef()

  const ObtenerIncidencia = async () => {
    try {
      const data = await consultarIncidenciaDashboard(inc_id)
      setIncidencia(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeSelect = e => {
    setCategoria(e.target.value)
  }



  useEffect(() => {
    ObtenerIncidencia()
  }, [])



  const handleSubmit = async e => {
    e.preventDefault()
    const datos = {
      resumen: resumenRef.current.value,
      nota: notaRef.current.value,
      observacion: observacionRef.current.value,
    }

    const datosTiming = {
      origen: 'rticket',
      tiempo: `${tiempoRedaccion.minutes < 10 ? "0" + tiempoRedaccion.minutes : tiempoRedaccion.minutes}:${tiempoRedaccion.seconds < 10 ? "0" + tiempoRedaccion.seconds : tiempoRedaccion.seconds} `
    }


    //insertamos el tiempo de 
    const { data: resultTiming } = await agregandoDataCronometrada(datosTiming);
    // console.log(resultTiming.data[0].descripcion)
    // console.log(resultTiming.data[0].tiempo)
    // console.log(resultTiming.result)
    //actualizamos la data que esta en el dashboard ya que se inserto inicialmente en la ruta '/' 
    const data = await insertarIncidencia(inc_id, datos, setErrores)
    if (data && resultTiming.result) {
      navigate('/');

      Swal.fire({
        title: data.data.message,
        text: `La incidencia ${incidencia?.data[0]?.id} tomó ${resultTiming.data[0].tiempo}`,
        icon: 'success',
        timer: 4000
      })

    }
  }
  if (!incidencia ) return <div className='dark:text-tcolor-dark '> Cargando</div>
  if (incidencia?.data.length === 0 ) return <div className='dark:text-tcolor-dark '> No hay incidencia </div>
  
  // Obtenemos la data de los minutos y segundos del componente Cronometro
  const ObteniendoDatosCronometro = ({ minutes, seconds }) => {
    setTiempoRedaccion({
      minutes,
      seconds
    })
  }                      




  return (
    <>
    

        <div className='flex justify-between '>
        <h1 className='text-2xl  font-black mt-4 dark:text-tcolor-dark '> Atendiendo la Incidencia : {incidencia?.data[0]?.id}   </h1>
        <Cronometer ObteniendoDatosCronometro={ObteniendoDatosCronometro} />
      </div>
      <div className=' w-full shadow-md rounded-md mt-10 px-5 py-10 ' >
        <form noValidate className='grid md:col-span-1 grid-cols-4 gap-4' onSubmit={handleSubmit}>
          <div className='mb-4 md:col-span-2 col-span-4'>
            <label htmlFor="cod_inc" className='text-slate-800 dark:text-tcolor-dark'>Codigo de Incidencia:  </label>
            <input type="text" id='cod_inc' ref={codIncRef} defaultValue={incidencia?.data[0]?.id} readOnly disabled className='mt-2 w-full p-3   rounded-md outline-none border-2  border-regal-blue' name='cod_inc' placeholder='INC000999999' />
          </div>
          <div className='mb-4 md:col-span-2 col-span-4'>
            <label htmlFor="resumen" className='text-slate-800 dark:text-tcolor-dark'>Ingresa el resumen del Ticket:  </label>
            <input type="text" id='resumen' ref={resumenRef} className='mt-2 w-full p-3  rounded-md outline-none border-2  border-regal-blue' name='resumen' placeholder='No accede a módulo trabajadores' />
          </div>
          <div className='mb-4  col-span-4 '>
            <label htmlFor="nota" className="text-slate-800 dark:text-tcolor-dark ">Ingresa la nota del Ticket: </label>
            <textarea id="nota" name='nota' ref={notaRef} className="mt-2 w-full p-3 resize-none rounded-md outline-none border-2 h-28 border-regal-blue" placeholder="Ingresa la nota del ticket"></textarea>
          </div>
          <div className='mb-4  col-span-4 '>
            <label htmlFor="observacion" className="text-slate-800 dark:text-tcolor-dark ">Ingresa la Observacion/Resolucioin del ticket: </label>
            <textarea id="observacion" ref={observacionRef} name='observacion' className="mt-2 w-full p-3 resize-none rounded-md outline-none border-2 h-28 border-regal-blue" placeholder="Ingresa la observacion del ticket"></textarea>
          </div>
          <div className='col-span-4'>
            {
              errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null
            }
          </div>
          <div className="" >
            <input type="submit" value='Atender!!' className='bg-regal-blue col-span-4 hover:bg-hover-regal rounded-md text-white   p-3 uppercase font-bold cursor-pointer' />

          </div>

        </form>
      </div>
      </>
      
 
     
    
  )
}

export default IncEdit
