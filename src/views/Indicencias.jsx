import React, { createRef, useEffect, useState } from 'react'
import TableInc from '../components/TableInc'
import { inc_atendidas } from '../data/inc_atendidas'
import { cod_apps } from '../data/apps'
import useIncidencias from '../hooks/useIncidencias'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import ButtonExcel from '../components/ButtonExcel'
import ReportPDF from '../reports/ReportPDF'
import { PDFDownloadLink } from '@react-pdf/renderer'

const Indicencias = () => {
  const navigate = useNavigate()
  const [incidencias, setIncidencias] = useState([])
  const [paginaActual, setPaginaActual] = useState(1)
  const [ultipaPagina, setUltimaPagina] = useState()
  const [categoria, setCategoria] = useState()
  const [busqueda, setBusqueda] = useState('')
  const [errores, setErrores] = useState({})
  const token = localStorage.getItem('AUTH_TOKEN')
  const fechaEnvioFromRef = createRef()
  const fechaEnvioToRef = createRef()
  const { data, filtrarIncidencias } = useIncidencias()

  // Se realizara dos busquedas 
  /*
   Habran dos tipos de busqueda, una apartir del input donde ingresan el codigo de incidencia
   y la otra sera entre la aplicacion y un rango de fechas a consultar, con un post en el boton
   buscar para preparar la data y con el boton , icono download , para preparar el pdf con al presionarlo
  
  */


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

  const handlePaginationNext = async e => {

    const url = `http://127.0.0.1:8000/api/incidencias?page=${paginaActual + 1}`
    await ObteniendoPaginacionIncidencias(url)

  }

  const handlePaginationPrevious = async e => {

    const url = `http://127.0.0.1:8000/api/incidencias?page=${paginaActual - 1}`
    await ObteniendoPaginacionIncidencias(url)

  }

  const handleFiltrar = (termino) => {
    const info = data.data.data
    var resultado = info.filter((elemento) => {
      if (elemento.id.toString().toUpperCase().includes(termino.toUpperCase()))
        return elemento
    })

    setIncidencias(resultado)
  }

  const handleInput = (e) => {
    console.log(e.target.value)
    const inputValue = e.target.value

    if (inputValue.trim() == '') {
      ObteniendoPaginacionIncidencias()
    }
    setBusqueda(inputValue)
    handleFiltrar(inputValue)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fecha_incio = fechaEnvioFromRef.current.value
    const fecha_fin = fechaEnvioToRef.current.value
    const apps_id = categoria

    //por si la fecha inicio es mas que la fecha fin
    if (fecha_incio > fecha_fin) {
      Swal.fire({
        title: ' La fecha incio debe ser menor a la fecha fin'
      })
      navigate('/incs');
    } else {
      //por si no envia el dato de id_app
      if (!apps_id || apps_id === 'Elige la aplicacion') {
        if (fecha_incio === '' || fecha_fin === '') {
          Swal.fire({
            title: 'Se deben colocar las dos fechas '
          })
          navigate('/incs');
        } else {
          const datos = {
            "fecha_envio_from": fecha_incio,
            "fecha_envio_to": fecha_fin
          }
          console.log(datos)
          const { data } = await filtrarIncidencias(datos)

          setIncidencias(data)
        }
      } else {
        if (fecha_incio === '' || fecha_fin === '') {
          Swal.fire({
            title: 'Se deben colocar las dos fechas '
          })
          navigate('/incs');
        } else {
          const datos = {
            "apps_id": apps_id,
            "fecha_envio_from": fecha_incio,
            "fecha_envio_to": fecha_fin

          }
          console.log(datos)
          const { data } = await filtrarIncidencias(datos)
          setIncidencias(data)
        }

      }
    }



  }

  const handleChangeSelect = e => {
    setCategoria(e.target.value)
  }

  useEffect(() => {
    ObteniendoPaginacionIncidencias()
  }, [])

  return (
    <>
      {/* En esta vista se recopilaran todas las incidencias atentidas es decir las incidencias con estado 2 y registradas en la tabla inc-atendidas */}
      {/* El usuario podra realizar las siguientes acciones, crear un reporte de las incidencias atendidas, buscar, crear reportes de las incidencias */}
      <div className='' >
        <h1 className='text-2xl md:text-4xl font-black mt-4 my-10 cols-span-4' >Filtra tu busqueda </h1>
        <div className='mb-4 mt-5 '>
          <label htmlFor="cod_inc" className='text-slate-800'>Busqueda por codigo de Incidencia:</label>
          {/* buscador para que cada que el usuario ingrese un caracter se actualice la grilla con la informacion necesaria */}
          <input type="text" id='cod_inc' value={busqueda} onChange={handleInput} className='mt-2 w-full p-3  rounded-md outline-none border-2  border-regal-blue' name='cod_inc' placeholder='INC000999999' />
        </div>
        <form className='grid   md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-4 mt-5 ' onSubmit={handleSubmit}>

          <div className='mb-4 '>
            {/* El usuario seleccionara la aplicacion a la cual quiere consultar y se filtraran internamente en el back por el codigo de aplicacion  */}
            <label htmlFor="cod_inc" className='text-slate-800'>Filtro por nombre de aplicación:</label>
            <select id="cod_inc" onChange={handleChangeSelect} className="bg-gray-50 border-2  text-gray-900 focus:ring-regal-blue focus:border-regal-blue  rounded-md  w-full mt-2  p-3 outline-none border-regal-blue ">
              <option defaultValue >Elige la aplicacion </option>
              {
                cod_apps.map(({ cod_app, nom_app }) => (
                  <option value={cod_app} key={cod_app} >{nom_app}</option>
                ))
              }
            </select>
          </div>
          <div >
            {/* buscador  de las fechas */}
            <div className='mb-4  grid grid-cols-2 gap-3'>
              <div>
                <label htmlFor='fecha_envio' className='text-slate-800'>Desde:</label>
                <input type="date" id='fecha_envio' ref={fechaEnvioFromRef} className='mt-2 w-full p-3 rounded-md outline-none border-2  border-regal-blue' name='fecha_envio' />
              </div>
              <div>
                <label htmlFor='fecha_atencion' className='text-slate-800'>Hasta :</label>
                <input type="date" id='fecha_atencion' ref={fechaEnvioToRef} className='mt-2 w-full p-3 rounded-md outline-none border-2  border-regal-blue' name='fecha_atencion' />
              </div>

            </div>
          </div>
          {/*botones*/}
          <div className='mb-4 pt-8 col-span-2  flex  gap-4 '>
            <div className='w-full'>
              {/* Boton para realizar el reporte pdf segun lo que haya filtrado el usuario sera un useState  inc_atendidas   */}
              <input type="submit" value='Buscar' className='bg-regal-blue hover:bg-hover-regal rounded-md text-white w-full  p-3 uppercase font-bold cursor-pointer' />
            </div>
          </div>
        </form>
        <div className=' flex  gap-4 mb-5 justify-end'>
          {
            incidencias ? (
                  <>
                      <div className='w-auto' >
            <ButtonExcel incidencias={incidencias} />
          </div>
          <div className='w-auto'>
            <PDFDownloadLink document={<ReportPDF incidencias={incidencias}/>} fileName='ReporteTickets.pdf'>
              {
                ({ loading }) => loading ? "Cargando..."
                   : (
                    <button className='  h-full text-white bg-regal-blue hover:bg-hover-regal rounded-md p-3 font-bold' >

                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                      </svg>

                    </button>
                  )
              }
            </PDFDownloadLink>


          </div>
                  </>
            ): "Cargando..."
          }
          


        </div>


      </div >
      <TableInc inc_atendidas={incidencias} />
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
    </>
  )
}

export default Indicencias
