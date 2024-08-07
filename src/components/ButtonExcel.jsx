import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import { useTiming } from '../hooks/useTiming'
import Swal from 'sweetalert2'

const ButtonExcel = ({ incidencias }) => {
    const [loading, setLoading] = useState(false)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const { agregandoDataCronometrada } = useTiming()

    const handleDownloadExcel = async () => {
      
        var timer = setInterval(() => {
            setSeconds(seconds + 1)
            if (seconds === 59) {
              setMinutes(minutes + 1)
              setSeconds(0)
            }
      
          }, 1000)


        const incs = incidencias.map(inc => {
            return {
                "Incidencia": inc.id,
                "Aplicacion": inc.app.name_app,
                "Resumen": inc.resumen,
                "Nota": inc.nota,
                "Fecha Alta Entity": inc.fecha_envio,
                "Fecha de Atencion": inc.fecha_atencion,
                "Observacion": inc.observacion,
                "Estado": inc.estado
            }
        }
        )


        setLoading(true)
        const libro = XLSX.utils.book_new();
        const hoja = XLSX.utils.json_to_sheet(incs);
        XLSX.utils.book_append_sheet(libro, hoja, "Incidencias")

        setTimeout(() => {
            XLSX.writeFile(libro, "IncidenciasReporteExcel.xlsx")
            setLoading(false)
        }, 1000)

        const datosTiming = {
            origen: 'ereporte',
            tiempo: `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds} `
          }


          //insertamos el tiempo de 
        const { data: resultTiming } = await agregandoDataCronometrada(datosTiming);
        if(resultTiming.result) {
    
          Swal.fire({
             title: 'Reporte excel generado',
             text : `La generacion del reporte excel tomó ${resultTiming.data[0].tiempo}`,
             icon: 'success',
             timer: 4000
           })

    }
}

    return (


        <button onClick={handleDownloadExcel} className='  h-full text-white bg-regal-blue hover:bg-hover-regal rounded-md p-3 font-bold' >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>

        </button>
    )
}

export default ButtonExcel
