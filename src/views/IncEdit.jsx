import React, { createRef, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { inc_atendidas } from '../data/inc_atendidas'
import useDashboard from '../hooks/useDashboard'
import { cod_apps } from '../data/apps'
import useIncidencias from '../hooks/useIncidencias'
import Swal from 'sweetalert2'
import Alerta from '../components/Alerta'

const IncEdit = () => {
  const navigate = useNavigate()
  const { inc_id } = useParams()
  const { consultarIncidenciaDashboard } = useDashboard()
  const {insertarIncidencia} = useIncidencias()
  const [errores,setErrores] = useState([])
  const [incidencia, setIncidencia] = useState()
  const [categoria, setCategoria] = useState()
  const codIncRef = createRef()
  const fechaEnvioRef = createRef()
  const resumenRef = createRef()
  const notaRef = createRef()
  const fechaAtencionRef = createRef()
  const observacionRef = createRef ()

  const ObtenerIncidencia = async () => {
    try {
      const data = await consultarIncidenciaDashboard(inc_id)
      setIncidencia(data)

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
      fecha_envio : fechaEnvioRef.current.value,
      resumen : resumenRef.current.value,
      apps_id : categoria,
      nota: notaRef.current.value,
      fecha_atencion : fechaAtencionRef.current.value,
      observacion : observacionRef.current.value

    }

    const data = await insertarIncidencia(inc_id,datos,setErrores)
    if(data) {
      Swal.fire({
        title: data.data.message
      })
      navigate('/incs');
    }
  }
  if (!incidencia) return <div> Cargando </div>

  return (
    <>
      <h1 className='text-2xl md:text-4xl font-black mt-4 '> Atendiendo la Incidencia : {incidencia.data[0].id}   </h1>
      <div className=' bg-wihte  w-full shadow-md rounded-md mt-10 px-5 py-10 ' >
        <form noValidate className='grid md:col-span-1 grid-cols-4 gap-4' onSubmit={handleSubmit}>
          <div className='mb-4 md:col-span-2 col-span-4'>
            <label htmlFor="cod_inc" className='text-slate-800'>Codigo de Incidencia:  </label>
            <input type="text" id='cod_inc' ref={codIncRef} defaultValue={incidencia.data[0].id} readOnly disabled className='mt-2 w-full p-3   rounded-md outline-none border-2  border-regal-blue' name='cod_inc' placeholder='INC000999999' />
          </div>
          <div className='mb-4 md:col-span-2 col-span-4'>
            {/* El usuario seleccionara la aplicacion a la cual quiere consultar y se filtraran internamente en el back por el codigo de aplicacion  */}
            <label htmlFor="cod_app" className='text-slate-800'>Filtro por nombre de aplicación:</label>
            <select id="cod_app" onChange={handleChangeSelect} name='cod_app' className="bg-gray-50 border-2  text-gray-900 focus:ring-regal-blue focus:border-regal-blue  rounded-md  w-full mt-2  p-3 outline-none border-regal-blue ">
              <option defaultValue >Elige la aplicacion </option>
              {
                cod_apps.map(({ cod_app, nom_app }) => (
                  <option value={cod_app} key={cod_app} >{nom_app}</option>
                ))
              }
            </select>
          </div>
          <div className='mb-4 md:col-span-2 col-span-4'>
            <label htmlFor="fecha_envio" className='text-slate-800'>Fecha de alta Entity:  </label>
            <input type="date" id='fecha_envio'  ref={fechaEnvioRef} className='mt-2 w-full p-3 rounded-md outline-none border-2  border-regal-blue' name='fecha_envio' />
          </div>
          <div className='mb-4 md:col-span-2 col-span-4'>
            <label htmlFor="resumen" className='text-slate-800'>Ingresa el resumen del Ticket:  </label>
            <input type="text" id='resumen' ref={resumenRef} className='mt-2 w-full p-3  rounded-md outline-none border-2  border-regal-blue' name='resumen' placeholder='No accede a módulo trabajadores' />
          </div>
          <div className='mb-4 md:col-span-2 col-span-4 '>
            <label htmlFor="nota" className="text-slate-800">Ingresa la nota del Ticket: </label>
            <textarea id="nota" name='nota'  ref={notaRef} className="mt-2 w-full p-3 resize-none rounded-md outline-none border-2 h-28 border-regal-blue" placeholder="Ingresa la nota del ticket"></textarea>
          </div>
          <div className='mb-4 md:col-span-2 col-span-4'>
            <label htmlFor="fecha_atencion" className='text-slate-800'>Fecha de atencion Entity:  </label>
            <input type="date" id='fecha_atencion' ref={fechaAtencionRef} className='mt-2 w-full p-3  rounded-md outline-none border-2  border-regal-blue' name='fecha_atencion' />
          </div>
          <div className='mb-4  col-span-4 '>
            <label htmlFor="observacion" className="text-slate-800">Ingresa la Observacion/Resolucioin del ticket: </label>
            <textarea id="observacion" ref={observacionRef} name='observacion' className="mt-2 w-full p-3 resize-none rounded-md outline-none border-2 h-28 border-regal-blue" placeholder="Ingresa la observacion del ticket"></textarea>
          </div>
          <div className='col-span-4'>
            {
              errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null
            }
          </div>
          <input type="submit"  value='Atender!!' className='bg-regal-blue col-span-4 hover:bg-hover-regal rounded-md text-white w-full  p-3 uppercase font-bold cursor-pointer' />
          
        </form>
      </div>
    </>
  )
}

export default IncEdit
