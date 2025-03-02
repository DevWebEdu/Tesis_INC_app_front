import React from 'react'
import { Link } from 'react-router-dom'

const TableInc = ({inc_atendidas}) => {

  return (
    <div className="relative overflow-auto max-h-[600px]  rounded-lg shadow-regal-blue shadow-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-l-4 border-regal-blue">
          <thead className="text-sm text-gray-700 text-center uppercase  dark:text-white font-bold ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Código de Incidencia 
              </th>
              <th scope="col" className="px-6 py-3">
                Atendido
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha de Alta Entity
              </th>
              <th scope="col" className="px-6 py-3">
                Resumen
              </th>
              <th scope="col" className="px-6 py-3">
                Aplicación
              </th>
              <th scope="col" className="px-6 py-3">
                Estado
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha resolucion Entity
              </th>
              <th scope="col" className="px-6 py-3">
                Acción
              </th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {
              inc_atendidas.map((inc,i)=>(
                <tr key={inc.id}>
                <th scope="row" className=" text-xs px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-tcolor-dark ">
                {inc.id}
                </th>
                <td className="px-6 py-4 text-xs">
                {inc.user.username}
                </td>
                <td className="px-6 py-4 text-xs">
                { !inc.fecha_atencion ? "-" :inc.fecha_envio }
                </td>
                <td className="px-6 py-4 text-xs">
                {!inc.resumen ? "-" :inc.resumen}
                </td>
                <td className="px-6 py-4 text-xs">
                {inc.app.name_app}
                </td>
                <td className="px-6 py-4 text-xs">
                {inc.estado =='atendiendo' ? <span className='bg-orange-600 text-white rounded-lg uppercase font-bold p-2'> {inc.estado} </span>  : <span className='bg-regal-blue  text-white rounded-lg uppercase font-bold p-2'>{ inc.estado} </span> }
                </td>
                <td className="px-6 py-4 text-xs" >
                {!inc.resumen ? "-" :inc.fecha_atencion}
                </td>
                <td className="px-6 py-4 text-xs">
                  <Link to={`/incs/${inc.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Ver Detalles</Link>
                </td>
              </tr>
              ))
            }
           
          </tbody>
        </table>
      </div>
  )
}

export default TableInc
