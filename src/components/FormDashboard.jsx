import React, { createRef, useEffect, useState } from 'react'
import { cod_apps } from '../data/apps'
import useDashboard from '../hooks/useDashboard'
import Alerta from './Alerta'
import { useNavigate } from 'react-router-dom'
import useApp from '../hooks/useApp'


function FormDashboard() {
    const navigate = useNavigate()
    const inputInc = createRef()
    const [errores, setErrores] = useState([])
    const [categoria, setCategoria] = useState()
    const { AgregarIncidenciaDashboard } = useDashboard()
    const {getApplications} = useApp()
    const [apps, setApps] = useState()

    const handleChangeSelect = e => {

        setCategoria(e.target.value)

    }

    const obteniendoAplicaciones = async () =>{
        const {data} = await getApplications()

        setApps(data)
    }

    const inputsClean = () => {
        inputInc.current.value = '';
        setCategoria(0)
    }
    
    const validarIncToAttend = async e => {
        e.preventDefault()

        const datos = {
            id: inputInc.current.value,
            apps_id: categoria
        }
        const data = await AgregarIncidenciaDashboard(datos, setErrores)
        // Volvemos los datos a 0
        inputsClean()
    }

   

    useEffect(() => {
        obteniendoAplicaciones()
    } ,[])
    return (
        <div className=' flex flex-col items-center container mx-auto  '>
            <h1 className='text-2xl md:text-4xl font-black mt-4 dark:text-tcolor-dark' >¿Que Incidencia Atenderás? </h1>
            <p className="text-xl   md:text-2xl my-10 dark:text-tcolor-dark">
                Ingresa el codigo de tu incidencia próxima a atender.
            </p>

            {/* COMPONENTE DE INGRESO DE INCIDENCIA A TRATAR */}
            <form className=' grid grid-cols-2 gap-1 ' onSubmit={validarIncToAttend}>
                <div className='col-span-2'>
                    {
                        errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null
                    }
                </div>


                <div className='mb-4 md:col-span-1 col-span-2 '>
                    <label htmlFor="cod_inc" className='text-slate-800 dark:text-tcolor-dark'>Codigo de Incidencia:  </label>
                    {/*  */}
                    <input type="text" id='cod_inc' className=  ' border-regal-blue focus:outline-none focus:ring-0 focus:border-black mt-2 w-full p-2 text-sm  rounded-md ' name='cod_inc' placeholder='INC000999999' ref={inputInc} />
                </div>

                {/* Este boton a parte de validar si ya esta siendo atendida la incidencia, en el caso de que no este atendida llevara al usuario a una vista donde podra ingresar los datos de atencion de la incidencia - Indicador de doble atencion validador si la atencion ya esta siendo atendida - Indicador de redaccion de incidencia al momento que envia al usuario a la nueva vista */}
                <div className='mb-4 md:col-span-1 col-span-2'>
                    {/* El usuario seleccionara la aplicacion a la cual quiere consultar y se filtraran internamente en el back por el codigo de aplicacion  */}
                    <label htmlFor="cod_app" className='text-slate-800 dark:text-tcolor-dark'>Filtro por nombre de aplicación:</label>
                    <select id="cod_app" onChange={(e) => handleChangeSelect(e)} value={categoria} name='cod_app' className="bg-gray-50  text-sm text-gray-900 focus:ring-regal-blue   rounded-md  w-full mt-2  p-2 outline-none ">
                        <option defaultValue >Elige la aplicacion </option>
                        {
                            apps?.map(({ id, name_app }) => (
                                <option value={id} key={id} >{name_app}</option>
                            ))
                        }
                    </select>
                </div>
                <div className=' col-span-2 flex justify-center items-center'>
                    {/* BOTON */}
                    <input type="submit" value='Atender' className='bg-regal-blue  hover:bg-hover-regal rounded-md text-white w-40 p-2 text-sm uppercase font-bold cursor-pointer' />

                </div>

            </form>
        </div>

    )
}

export default FormDashboard