import React, { useEffect, useState } from 'react'
import useDashboard from '../hooks/useDashboard';

export const IncViewModal = ({ incidencia_id, onClose }) => {
    const [incidencia, setIncidencia] = useState(null)
    const {consultarIncidenciaDashboard} = useDashboard()

    const ObtenerIncidencia = async () => {
        try {
            const data = await consultarIncidenciaDashboard(incidencia_id)
            setIncidencia(data)
        } catch (error) {
            console.log(error)
        }
    }


    if (!incidencia_id && !incidencia) return null;

    useEffect(() => {
        
        ObtenerIncidencia()
        console.log(incidencia?.data)
    }, [incidencia_id])


    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-md font-bold mb-4 uppercase">Detalles de Incidencia  <span className=''>{incidencia?.data[0]?.id}</span>  </h2>
                <div className='flex  justify-center gap-1'>   
                    <div className='w-full'>
                        <p><strong>Usuario:</strong></p>
                        <p className='bg-slate-700 px-2 py-1 uppercase font-semibold text-sm text-white rounded-sm'>{incidencia?.data[0]?.user?.username}</p>
                    </div>
                    <div className='w-full'>
                        <p><strong>Estado:</strong></p>
                        <p className= {`${incidencia?.data[0]?.estado == 'Resuelto' ? 'bg-green-600' : 'bg-amber-400'}  px-2 py-1 uppercase font-semibold text-sm text-white rounded-sm `}>{incidencia?.data[0]?.estado}</p>
                    </div>
                </div>
                <div>   
                    <p><strong>Resumen:</strong></p>
                    <p className='bg-slate-700 px-2 py-1 uppercase font-semibold text-sm text-white rounded-sm'>{incidencia?.data[0]?.resumen ? incidencia?.data[0]?.resumen : 'Aún en atencion' }</p>
                </div>
                <div>   
                    <p><strong>Nota:</strong></p>
                    <p className='bg-slate-700 px-2  py-1 uppercase font-semibold text-sm text-white rounded-sm max-h-36 overflow-auto'>{incidencia?.data[0]?.nota  ? incidencia?.data[0]?.nota : 'Aún en atencion'}</p>
                </div>
                <div>   
                    <p><strong>Observacion:</strong></p>
                    <p className='bg-slate-700 px-2  py-1 uppercase font-semibold text-sm text-white rounded-sm max-h-36 overflow-auto'>{incidencia?.data[0]?.observacion ? incidencia?.data[0]?.observacion  : 'Aún en atencion'}</p>
                </div>
             
                <div className="mt-4">
                    <button
                        onClick={onClose}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    )
}
