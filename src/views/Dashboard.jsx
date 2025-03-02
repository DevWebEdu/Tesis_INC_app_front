
import CardAtention from '../components/CardAtention'
import useSWR from 'swr'
import clienteAxios from '../config/axios'
import FormDashboard from '../components/FormDashboard'
import useAuth1 from '../hooks/useAuth1'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const Dashboard = () => {



  const { user } = useAuth1()

  

  const fetcher = async () => {
    const token = localStorage.getItem('AUTH_TOKEN')
    const data = await clienteAxios('/api/dashboard',
      {
        headers:
        {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const dataSimplify = data.data.data.sort((a) => {
      if (a.user === user.username) {
        return -1
      }
    })

    
    return dataSimplify
  }

  const { data, error, isLoading } = useSWR('/api/dashboard', fetcher, {
    refreshInterval: 1000
  })

  if (!user) return 'Cargando User...';
  if (isLoading) return 'Cargando...';



  return (

    <div className='  '>
      <FormDashboard />

      {/* Crear del apartado para visualizar las incidencias  */}
      <section
        className='mt-5 py-5'
      >
     
        <h3 className='text-2xl font-semibold dark:text-tcolor-dark' >Se estan resolviendo las incidencias </h3>

        <div className='grid xl:grid-cols-5 md:grid-cols-2 grid-cols-1   gap-4 mt-5' >
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

  )
}

export default Dashboard
