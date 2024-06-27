import React, { createRef, useState } from 'react'
import CardAtention from '../components/CardAtention'
import { atencion_actual } from '../data/inc_atencion'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import useDashboard from '../hooks/useDashboard'
import useSWR from 'swr'
import clienteAxios from '../config/axios'
import { cod_apps } from '../data/apps'
import useAuth from '../hooks/useAuth'
import Alerta from '../components/Alerta'

const Dashboard = () => {
  const inputInc = createRef()
  const [categoria, setCategoria] = useState('Elige la aplicacion')
  const navigate = useNavigate()
  const [errores, setErrores] = useState([])
  const { user } = useAuth({
    middleware: 'worker'
  })


 
  const fetcher = async () => { 
    const token = localStorage.getItem('AUTH_TOKEN')
    const  data  = await clienteAxios('/api/dashboard',
        {
            headers:
            {
                Authorization: `Bearer ${token}`
            }
        }
    )
    const dataSimplify = data.data.data.sort((a)=>{
      if(a.user === user.username){
        return -1
      }else {
        return 1
      }
    })

    return dataSimplify
}

 const { data, error, isLoading } = useSWR('/api/dashboard', fetcher, {
  refreshInterval: 1000
  })

  const {  AgregarIncidenciaDashboard } = useDashboard()
  if (isLoading  ) return 'Cargando...';
  

  
 
 

  const validarIncToAttend = async e => {
    e.preventDefault()
    const datos = {
      id: inputInc.current.value,
      apps_id: categoria
    }
    const data = await AgregarIncidenciaDashboard(datos, setErrores)
    if (data) {
      navigate(`/incs/${inputInc.current.value}`);
    }
  }

  const handleChangeSelect = e => {
    setCategoria(e.target.value)
  }

  return (
    <>
      <h1 className='text-2xl md:text-4xl font-black mt-4 ' >¿Que Incidencia Atenderás? </h1>
      <p className="text-xl   md:text-2xl my-10">
        Ingresa el codigo de tu incidencia próxima a atender.
      </p>
      <div>
        <form className=' md:w-1/2 grid grid-cols-2 gap-4' onSubmit={validarIncToAttend}>
          <div className='col-span-2'>
            {
              errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null
            }
          </div>


          <div className='mb-4 md:col-span-1 col-span-2'>
            <label htmlFor="cod_inc" className='text-slate-800'>Codigo de Incidencia:  </label>
            <input type="text" id='cod_inc' className='mt-2 w-full p-3  rounded-md outline-none border-2  border-regal-blue' name='cod_inc' placeholder='INC000999999' ref={inputInc} />
          </div>
          {/* Este boton a parte de validar si ya esta siendo atendida la incidencia, en el caso de que no este atendida llevara al usuario a una vista donde podra ingresar los datos de atencion de la incidencia - Indicador de doble atencion validador si la atencion ya esta siendo atendida - Indicador de redaccion de incidencia al momento que envia al usuario a la nueva vista */}
          <div className='mb-4 md:col-span-1 col-span-2'>
            {/* El usuario seleccionara la aplicacion a la cual quiere consultar y se filtraran internamente en el back por el codigo de aplicacion  */}
            <label htmlFor="cod_app" className='text-slate-800'>Filtro por nombre de aplicación:</label>
            <select id="cod_app" onChange={(e) => handleChangeSelect(e)} value={categoria} name='cod_app' className="bg-gray-50 border-2  text-gray-900 focus:ring-regal-blue focus:border-regal-blue  rounded-md  w-full mt-2  p-3 outline-none border-regal-blue ">
              <option defaultValue >Elige la aplicacion </option>
              {
                cod_apps.map(({ cod_app, nom_app }) => (
                  <option value={cod_app} key={cod_app} >{nom_app}</option>
                ))
              }
            </select>
          </div>
          <input type="submit"  value='Atender!!' className='bg-regal-blue col-span-2 hover:bg-hover-regal rounded-md text-white w-full  p-3 uppercase font-bold cursor-pointer' />
        
        </form>
        {/* Crear del apartado para visualizar las incidencias  */}
        <section
          className='mt-5 py-5'
        >
          <h3 className='text-base font-black' >Se estan resolviendo las incidencias</h3>

          <div className='grid md:grid-cols-4  sm:grid-cols-2 grid-cols-1   gap-4 mt-5' >
            {/* En este apartado conjuntamente con el Backend y la tabla inc-atencion estaran solo las  inc que esten en estado 1 , lo que significa que estan siendo atendidas en ese momento, por otro lado las que tengan estado 2 son las que ya fueron atendidas y deben estar en la tabla inc-atendidas */}
            {
              data ? 

              data.map((inc, i) => (
                <CardAtention atention={inc} key={i} />
              ))
              : "Cargando"
            }
          </div>
        </section>
      </div>
    </>
  )
}

export default Dashboard
