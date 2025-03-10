import React, { useEffect, useState } from 'react'
import { useWorkers } from '../hooks/useWorkers'
import CardAtention from './CardAtention'
import useApp from '../hooks/useApp'

export const FormWorkers = ({ workerId ,onShowModal}) => {

  const [worker, setWorker] = useState(null)
  const { getWorker, turnOnOffAdminWorkers, getIncsFromWorkers } = useWorkers()
  const [incidenciasFromUser, setIncidenciasFromUsers] = useState([])


  const getWorkerForm = async () => {
    const data = await getWorker(workerId)
    setWorker(data)
  }

  const deAdminATrabajador = async (id) => {
    const data = await turnOnOffAdminWorkers(id)
    setWorker(data)
  }

 

  const incsOfWorker = async () => {
    const { data } = await getIncsFromWorkers(workerId)
    setIncidenciasFromUsers(data.incidencias)
  }

  useEffect(() => {
    if (workerId) {
      getWorkerForm()
      incsOfWorker()
    }
    
  }, [workerId])

  if (!workerId) return <div className='w-full font-light text-3xl dark:text-tcolor-dark '>No has seleccionado ningun usuario</div>

  return (

    <>{
      worker ?
        (<div className='w-full  my-5 md:mt-0 mt-20'>
          <div className='flex justify-between items-center'>
            <h4 className='font-light text-3xl dark:text-tcolor-dark'> {worker?.user?.name}</h4>
            {worker?.user?.admin === '0' ?
              (
                <button className='p-3 bg-regal-blue text-white uppercase font-semibold rounded-md text-sm' onClick={() => deAdminATrabajador(worker?.user?.id)}>
                  Dar Admin
                </button>
              ) :
              (
                <button className='p-3 bg-regal-blue text-white uppercase font-semibold rounded-md text-sm' onClick={() => deAdminATrabajador(worker?.user?.id)}>
                  Quitar Admin
                </button>
              )
            }
          </div>
          <div className='grid  sm:grid-cols-2  overflow-auto max-h-[610px] p-3   gap-4 mt-5'>
              { 
                incidenciasFromUser ? 
               (<>
                  {incidenciasFromUser.map((inc,i)=>(
                      <div className='shadow-2xl p-3 border-l-4  dark:bg-sidebarbg-color  border-regal-blue rounded-md text-xs' key={i}>
                      <div className=' flex justify-between  font-bold'>
                          <button className=' uppercase font-extrabold pt-1 dark:text-tcolor-dark'   onClick={() => onShowModal(inc.id)}>  {inc.id} </button>
                          <div className='flex gap-1'>
                           <span className={`${inc.prioridad == 'Media' ? 'bg-orange-400 text-white p-1 rounded-md ' : 'bg-cyan-700 text-white p-1 rounded-md '}  `}> {inc.prioridad}  </span> 
                           <span className={`${inc.estado == 'Resuelto' ? 'bg-regal-blue text-white p-1 rounded-md ' : 'bg-yellow-400 text-white p-1 rounded-md '}  `}> {inc.estado}  </span> 
                          </div>
                      </div>
                      {/* <div className='flex flex-row justify-between mt-3 items-center'>
                          <p className='font-bold dark:text-tcolor-dark uppercase'> codigo : {id}</p> 
                      </div> */}
                  </div>
                  ))}
               </>)
                :  ( <div className=' font-light text-3xl dark:text-tcolor-dark'>El usuario no tiene incidencias</div>)  
              }
          </div>
        </div>
        ) :
        (<div className='w-full font-light text-3xl dark:text-tcolor-dark'>Cargando</div>)
    }</>
  )
}
