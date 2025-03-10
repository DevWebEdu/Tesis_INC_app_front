import React from 'react'
import { useNavigate } from 'react-router-dom'
import useDashboard from '../hooks/useDashboard'
import Swal from 'sweetalert2'
import useAuth1 from '../hooks/useAuth1'

function CardAtention({ atention }) {
    const navigate = useNavigate()
    const {eliminandoIncidencia} = useDashboard()
    const { user:worker } = useAuth1()

    console.log(worker)
    const workerSession = worker.username
    
    const { user, name_app, estado, id } = atention

    const EditarOrResolveInc = () => {
        navigate(`/incs/${id}`);
    }

    const deleteInc = async() =>{
        const {data,message} = await eliminandoIncidencia(id)
        if ( data === 1 ){
            Swal.fire({
                title:message
            })
        }
    }

    return (
        <div className='shadow-2xl p-3 border-l-4 bg-white dark:bg-sidebarbg-color border-regal-blue rounded-md text-xs'>
            <div className=' flex justify-between  font-bold'>
                <h5 className=' uppercase font-extrabold pt-1 dark:text-tcolor-dark'  > {user} </h5>
                <span className='bg-regal-blue text-white p-1 rounded-md dark:bg-tcolor-dark'> {name_app}  </span>
            </div>
            <div className='flex flex-row justify-between mt-3 items-center'>
                <p className='font-bold dark:text-tcolor-dark uppercase'> codigo : {id}</p>
                {   
                // valida los ticket del usuario, agregando botones de edicion para los tickets del usuario conectado 
                    workerSession === user ? (
                        <div className='flex gap-2 items-center'>
                        <button onClick={EditarOrResolveInc} className='bg-amber-400 dark:bg-linksbg-color-light col-span-2 hover:bg-amber-600 rounded-md hover:scale-125 text-white w-full px-1 py-1  uppercase font-bold cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
    
                        </button>
                        <button  onClick={deleteInc} className='bg-red-500 dark:bg-sidebarbg-color-light col-span-2 hover:scale-125 rounded-md hover:bg-red-800 text-white w-full px-1 py-1  uppercase font-bold cursor-pointer' >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>
                    </div>
                    ) : null
                } 
                
            </div>
        </div>
    )
}

export default CardAtention