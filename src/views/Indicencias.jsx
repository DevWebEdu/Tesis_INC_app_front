import React, { createRef, useEffect, useState } from 'react'
import TableInc from '../components/TableInc'
import useIncidencias from '../hooks/useIncidencias'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import ButtonExcel from '../components/ButtonExcel'


import useApp from '../hooks/useApp'
import ReportePDFNew from '../reports/ReportePDFNew'
import { useTiming } from '../hooks/useTiming'
import { IncViewModal } from '../components/IncViewModal'

const Indicencias = () => {
  const navigate = useNavigate()
  const [incidencias, setIncidencias] = useState([])
  const [paginaActual, setPaginaActual] = useState(1)
  const [ultipaPagina, setUltimaPagina] = useState()
  const [categoria, setCategoria] = useState()
  const [busqueda, setBusqueda] = useState('')
  const token = localStorage.getItem('AUTH_TOKEN')
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const {agregandoDataCronometrada} = useTiming()
  const fechaEnvioFromRef = createRef()
  const fechaEnvioToRef = createRef()
  const { data, filtrarIncidencias } = useIncidencias()
  const [disableButtonFilter, setDisableButtonFilter] = useState(true)
  const [apps, setApps] = useState()
  const { getApplications } = useApp()
  const [showModal,setShowModal] = useState(false)
  const [incModalShow,setIncModalShow] = useState(null)

  //trae todas las apps
  const obteniendoAplicaciones = async () => {
    const { data } = await getApplications()

    setApps(data)
  }

  // Se realizara dos busquedas 
  /*
   Habran dos tipos de busqueda, una apartir del input donde ingresan el codigo de incidencia
   y la otra sera entre la aplicacion y un rango de fechas a consultar, con un post en el boton
   buscar para preparar la data y con el boton , icono download , para preparar el pdf con al presionarlo
  
  */
  // limpiar inputs
  const limpiarFilros = async () => {
    fechaEnvioToRef.current.value = ''
    fechaEnvioFromRef.current.value = ''
    setCategoria('Elige la aplicacion')
    setBusqueda('')
    setDisableButtonFilter(true)
    await ObteniendoPaginacionIncidencias()
  }

  /* Trae toda la data que existe en la bd */
  const ObteniendoPaginacionIncidencias = async (url) => {
    const urlModificada = url ? url : `http://127.0.0.1:8000/api/incidencias?page=1`
    const data = await axios.get(urlModificada, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setPaginaActual(data.data.meta.current_page)
    setIncidencias(data.data.data)
    setUltimaPagina(data.data.meta.last_page)
  }

  // metodo para next paginacion
  const handlePaginationNext = async e => {

    const url = `http://127.0.0.1:8000/api/incidencias?page=${paginaActual + 1}`
    await ObteniendoPaginacionIncidencias(url)

  }

  // metodo para back paginacion
  const handlePaginationPrevious = async e => {

    const url = `http://127.0.0.1:8000/api/incidencias?page=${paginaActual - 1}`
    await ObteniendoPaginacionIncidencias(url)

  }


  // Input para  buscar por codigo de incidencia
  const handleInput = (e) => {

    const inputValue = e.target.value

    if (inputValue.trim() == '') {
      ObteniendoPaginacionIncidencias()
    }
    setBusqueda(inputValue)
    handleFiltrar(inputValue)
  }

  const handleFiltrar = (termino) => {
    const info = data.data.data
    var resultado = info.filter((elemento) => {
      if (elemento.id.toString().toUpperCase().includes(termino.toUpperCase()))
        return elemento
    })

    setIncidencias(resultado)
  }
  // funcion para manejar los filtros
  const manejandoFiltros = async (fecha_inicio, fecha_fin, apps_id) => {
    const datos = {
      'apps_id': apps_id && Number(apps_id),
      'fecha_envio_from': fecha_inicio && fecha_inicio,
      'fecha_envio_to': fecha_fin && fecha_fin

    }


    if (datos.fecha_envio_from == '' && datos.fecha_envio_to == '' && datos.apps_id == 'Elige la aplicacion') {
      Swal.fire({
        title: 'No intentes filtrar sin data'
      })
      navigate('/incs');
    }

    else if (datos.fecha_envio_from != '' && datos.fecha_envio_to == '') {
      Swal.fire({
        title: 'No puede haber fecha de inicio sin fin'
      })
      navigate('/incs');
    }
    else if (datos.fecha_envio_to != '' && datos.fecha_envio_from == '') {
      Swal.fire({
        title: 'No puede haber fecha de fin sin inicio'
      })
      navigate('/incs');
    }
    else if (datos.fecha_envio_from > datos.fecha_envio_to) {
      Swal.fire({
        title: ' La fecha incio debe ser menor a la fecha fin'
      })
      navigate('/incs');
    }
    else {
      // borramos la info no necesaria
      const filteredData = Object.fromEntries(
        Object.entries(datos).filter(([_, value]) => value !== "" && value !== null && value !== undefined && value !== 'Elige la aplicacion' && !Number.isNaN(value))
      );


      const datosTiming = {
        origen: 'bticket',
        tiempo: `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds} `
      }

      const { data: resultTiming } = await agregandoDataCronometrada(datosTiming);
      const { data } = await filtrarIncidencias(filteredData)

      if (data.length > 0 && resultTiming.result) {
        Swal.fire({
          title: 'Busqueda realizada con éxito',
          text: `La busqueda tomó ${resultTiming.data[0].tiempo}`,
          icon: 'success',
          timer: 4000
        })
        setIncidencias(data)
      } else {
        Swal.fire({
          title: 'No hay data en esas fechas '
        })
        await ObteniendoPaginacionIncidencias()
      }
    }



  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    var timer = setInterval(() => {
      setSeconds(seconds + 1)
      if (seconds === 59) {
        setMinutes(minutes + 1)
        setSeconds(0)
      }
    }, 1000)

    const fecha_incio = fechaEnvioFromRef.current.value
    const fecha_fin = fechaEnvioToRef.current.value
    const apps_id = categoria

    manejandoFiltros(fecha_incio, fecha_fin, apps_id)

    clearInterval(timer)
  }
  // metodo para habilitar el boton buscar  apps
  const handleChangeSelect = e => {
    if (e.target.value != 'Elige la aplicacion') {
      setDisableButtonFilter(false)
    } else {
      setDisableButtonFilter(true)
    }
    setCategoria(e.target.value)
  }
  // metodo para habilitar el boton buscar  fecha_envio
  const onChangeDateFrom = (e) => {
    fechaEnvioFromRef.current.value = e.target.value
    if (fechaEnvioFromRef.current.value) {
      setDisableButtonFilter(false)
    } else {
      setDisableButtonFilter(true)
    }
  }
  // metodo para habilitar el boton buscar  fecha_atencion
  const onChangeDateTo = (e) => {
    fechaEnvioToRef.current.value = e.target.value
    if (fechaEnvioToRef.current.value) {
      setDisableButtonFilter(false)
    } else {
      setDisableButtonFilter(true)
    }
  }

  // metodo para enviar el id desde el. hijo  TableInc , y abre el modal
  const showModalHandler = id => {
    setShowModal(true)
    setIncModalShow(id)
  }

  // metodo para enviar el id desde el hijo  TableInc , y cierra el modal
  const closeModal =() =>{

    setShowModal(false)
    setIncModalShow(null)
  }

  useEffect(() => {
    ObteniendoPaginacionIncidencias()
    obteniendoAplicaciones()
  }, [])

  return (
    <>
      {/* En esta vista se recopilaran todas las incidencias atentidas es decir las incidencias con estado 2 y registradas en la tabla inc-atendidas */}
      {/* El usuario podra realizar las siguientes acciones, crear un reporte de las incidencias atendidas, buscar, crear reportes de las incidencias */}
      <div className=''>
        <h1 className='text-2xl md:text-4xl font-black mt-4 my-10 cols-span-4 dark:text-tcolor-dark' >Filtra tu busqueda </h1>
        <div className='mb-4 mt-5 '>
          <label htmlFor="cod_inc" className='text-slate-800 dark:text-tcolor-dark'>Busqueda por codigo de Incidencia:</label>
          {/* buscador para que cada que el usuario ingrese un caracter se actualice la grilla con la informacion necesaria */}
          <input type="text" id='cod_inc' value={busqueda} onChange={handleInput} className='mt-2 w-full p-3  rounded-md outline-none border-2  border-regal-blue' name='cod_inc' placeholder='INC000999999' />
        </div>
        <form className='grid   md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-4 mt-5 ' onSubmit={handleSubmit}>

          <div className='mb-4 '>
            {/* El usuario seleccionara la aplicacion a la cual quiere consultar y se filtraran internamente en el back por el codigo de aplicacion  */}
            <label htmlFor="cod_inc" className='text-slate-800 dark:text-tcolor-dark'>Filtro por nombre de aplicación:</label>
            <select id="cod_inc" value={categoria} onChange={handleChangeSelect} className="bg-gray-50 border-2  text-gray-900 focus:ring-regal-blue focus:border-regal-blue  rounded-md  w-full mt-2  p-3 outline-none border-regal-blue ">
              <option defaultValue >Elige la aplicacion </option>
              {
                apps?.map(({ id, name_app }) => (
                  <option value={id} key={id} >{name_app}</option>
                ))
              }
            </select>
          </div>
          <div >
            {/* buscador  de las fechas */}
            <div className='mb-4  grid grid-cols-2 gap-3'>
              <div>
                <label htmlFor='fecha_envio' className='text-slate-800 dark:text-tcolor-dark'>Desde:</label>
                <input type="date" id='fecha_envio' ref={fechaEnvioFromRef} onChange={e => onChangeDateFrom(e)} className='mt-2 w-full p-3 rounded-md outline-none border-2  border-regal-blue' name='fecha_envio' />
              </div>
              <div>
                <label htmlFor='fecha_atencion' className='text-slate-800 dark:text-tcolor-dark'>Hasta :</label>
                <input type="date" id='fecha_atencion' ref={fechaEnvioToRef} onChange={e => onChangeDateTo(e)} className='mt-2 w-full p-3 rounded-md outline-none border-2  border-regal-blue' name='fecha_atencion' />
              </div>

            </div>
          </div>
          {/*botones*/}
          <div className='mb-4 pt-8 col-span-2  flex  gap-4 '>
            <div className='w-full'>
              {/* Boton para realizar el reporte pdf segun lo que haya filtrado el usuario sera un useState  inc_atendidas   */}
              <input type="submit" disabled={disableButtonFilter} value='Buscar' className={`${disableButtonFilter ? ' bg-slate-700 rounded-md text-white w-full  p-3 uppercase font-bold ' : 'bg-regal-blue hover:bg-hover-regal rounded-md text-white w-full  p-3 uppercase font-bold cursor-pointer'}`} />
            </div>

          </div>
        </form>
        <div className=' flex  gap-4 mb-5 justify-end'>
          {
            incidencias ? (
              <>
                <button className='bg-regal-blue hover:bg-hover-regal rounded-md text-white  p-3 uppercase font-bold cursor-pointer' onClick={() => limpiarFilros()}>
                  Limpiar filtros
                </button>
                <div className='w-auto' >
                  <ButtonExcel incidencias={incidencias} />
                </div>
                <div className='w-auto'>
                  <ReportePDFNew incidencias={incidencias} />
                </div>

              </>
            ) : "Cargando..."
          }



        </div>


      </div >

      <TableInc inc_atendidas={incidencias}  onShowModal={showModalHandler}/>
      {/* BOTONES next - previous */}
      <div className='w-full  p-5 mt-3 flex flex-row justify-center items-center'>
        {
          paginaActual === 1 ? null : (
            <div className=''>
              <button onClick={() => handlePaginationPrevious()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
                </svg>
              </button>
            </div>
          )
        }

        <span className='bg-regal-blue text-white rounded-lg uppercase font-bold p-2 block mx-10'> {paginaActual} </span>
        {
          paginaActual === ultipaPagina ? null : (
            <div className=''>
              <button onClick={() => handlePaginationNext()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
                </svg>
              </button>
            </div>
          )}

      </div>

      {/* Modal de incidencia */}
      { 
        showModal && (
          <IncViewModal
              onClose={closeModal}
              incidencia_id={incModalShow}
          />
        )
      }
    </>
  )
}

export default Indicencias
