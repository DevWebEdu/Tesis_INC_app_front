import React from 'react'

export const TableWorkers = ({ workers ,SelectedWorker }) => {



    return (
        <div className=" w-full relative overflow-auto max-h-[700px]  rounded-lg shadow-regal-blue shadow-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-l-4 border-regal-blue">
                <thead className="sticky top-0   bg-color-layour-light border-b-2 dark:bg-color-layout-dark shadow-2xl text-center uppercase text-sm text-gray-700  dark:text-white font-bold ">
                    <tr>
                        
                        <th scope="col" className="px-3 py-3">
                            Nombre
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Username
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Permisos
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {
                        workers.map((worker, i) => (
                            <tr key={i}>
                                <td className=" py-4 text-xs">
                                    {worker.name}
                                </td>
                                <td className="px-3 py-4 text-xs">
                                    {worker.username}
                                </td>
                                <td className="px-6 py-4 text-xs">
                                    {worker.admin == '1'  ? "Admin" : "Trabajador"}
                                </td>
                                <td className="px-6 py-4 text-xs">
                                    <button className="p-2 bg-cyan-700 text-white font-semibold uppercase rounded-md" onClick={()=>SelectedWorker(worker.id) } >
                                        Especificaciones
                                    </button>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}
