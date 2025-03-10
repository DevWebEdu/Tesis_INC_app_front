import React from 'react'

export const CreateNewWorkerForm = () => {
    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-md font-bold mb-4 uppercase">Crear un nuevo trabajador</h2>
                <form noValidate className='grid md:col-span-1 grid-cols-4 gap-4' onSubmit={handleSubmit}>
                    <div className='mb-4 md:col-span-2 col-span-4'>
                        <label htmlFor="cod_inc" className='text-slate-800 dark:text-tcolor-dark'>Codigo de Incidencia:  </label>
                        <input type="text" id='cod_inc' ref={codIncRef} defaultValue={incidencia?.data[0]?.id} readOnly disabled className='mt-2 w-full p-3   rounded-md outline-none border-2  border-regal-blue' name='cod_inc' placeholder='INC000999999' />
                    </div>
                    <div className='mb-4 md:col-span-2 col-span-4'>
                        <label htmlFor="resumen" className='text-slate-800 dark:text-tcolor-dark'>Ingresa el resumen del Ticket:  </label>
                        <input type="text" id='resumen' ref={resumenRef} className='mt-2 w-full p-3  rounded-md outline-none border-2  border-regal-blue' name='resumen' placeholder='No accede a módulo trabajadores' />
                    </div>
                    <div className='mb-4  col-span-4 '>
                        <label htmlFor="nota" className="text-slate-800 dark:text-tcolor-dark ">Ingresa la nota del Ticket: </label>
                        <textarea id="nota" name='nota' ref={notaRef} className="mt-2 w-full p-3 resize-none rounded-md outline-none border-2 h-28 border-regal-blue" placeholder="Ingresa la nota del ticket"></textarea>
                    </div>
                    <div className='mb-4  col-span-4 '>
                        <label htmlFor="observacion" className="text-slate-800 dark:text-tcolor-dark ">Ingresa la Observacion/Resolucioin del ticket: </label>
                        <textarea id="observacion" ref={observacionRef} name='observacion' className="mt-2 w-full p-3 resize-none rounded-md outline-none border-2 h-28 border-regal-blue" placeholder="Ingresa la observacion del ticket"></textarea>
                    </div>
                    <div className='col-span-4'>
                        {
                            errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null
                        }
                    </div>
                    <div className="" >
                        <input type="submit" value='Atender!!' className='bg-regal-blue col-span-4 hover:bg-hover-regal rounded-md text-white   p-3 uppercase font-bold cursor-pointer' />

                    </div>

                </form>
            </div>
        </div>
    )
}
