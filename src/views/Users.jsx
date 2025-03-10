import React, { useEffect, useState } from 'react'
import { useWorkers } from '../hooks/useWorkers'
import { TableWorkers } from '../components/TableWorkers'
import { FormWorkers } from '../components/FormWorkers'
import useSWR from 'swr'
import clienteAxios from '../config/axios'
import { IncViewModal } from '../components/IncViewModal'

const Users = () => {
  // const [trabajadores, setTrabajadores] = useState()
  const [trabajadorSeleccionado, setTrabajadorSeleccionado] = useState(null)
  const { getWorkers } = useWorkers()
  const [showModal, setShowModal] = useState(false)
  const [incModalShow, setIncModalShow] = useState(null)

  const handleSelectedTrabakador = (id) => {
    setTrabajadorSeleccionado(id)
  }


  const fetcher = async () => {
    const token = localStorage.getItem('AUTH_TOKEN')
    const { data } = await clienteAxios.get('/api/workers', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return data?.workers

  }

  const { data: trabajadores, error, isLoading } = useSWR('/api/workers', fetcher, {
    refreshInterval: 100
  })

  // metodo para enviar el id desde el. hijo  TableInc , y abre el modal
  const showModalHandler = id => {
    setShowModal(true)
    setIncModalShow(id)
  }

  // metodo para enviar el id desde el hijo  TableInc , y cierra el modal
  const closeModal = () => {

    setShowModal(false)
    setIncModalShow(null)
  }

  

  if (isLoading) return <> Cargando </>

  return (
    <div>
      <div className='flex items-center justify-start mt-4 gap-4'>
        <h1 className='text-2xl md:text-4xl font-black my-10 dark:text-tcolor-dark' >Trabajadores</h1>
        {/* <button className='bg-regal-blue p-2 rounded-md'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={4} stroke="white" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>

        </button> */}
      </div>

      {
        trabajadores && (
          <div className='md:flex justify-center gap-24 '>
            <TableWorkers workers={trabajadores} SelectedWorker={handleSelectedTrabakador} />
            <FormWorkers workerId={trabajadorSeleccionado} onShowModal={showModalHandler} />
          </div>
        )
      }
      {/* Modal de incidencia */}
      {
        showModal && (
          <IncViewModal
            onClose={closeModal}
            incidencia_id={incModalShow}
          />
        )
      }
    </div>
  )
}

export default Users
