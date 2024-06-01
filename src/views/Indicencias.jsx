import React from 'react'

const Indicencias = () => {
  const inc_atendida = [
    {
      cod_inc : 'INC000555555',
      id_app : "Gfiscal",
      desc_inc : "EDOCS  sin respuesta",//casuistica
      time_attention : "10min",
      id_user: "ejluna",
      estado_at  : "Resuelto",
      analisis_inc : "El usuario reporta EDOCS sin respuesta ",
      motivo_inc : " Existen SES que no han sido respondidos aun por consecuencia de formatos erroneos ",
      accion_done_inc : " Se procedio a separar del proceso los SES que encolaban el proceso",
      accion_user_inc : " Favor de verificar en el sistema "
    }
  ]

  return (
    <>

      {/* En esta vista se recopilaran todas las incidencias atentidas es decir las incidencias con estado 2 y registradas en la tabla inc-atendidas */}
      {/* El usuario podra realizar las siguientes acciones, crear un reporte de las incidencias atendidas, buscar, crear reportes de las incidencias */}
     
    </>
  )
}

export default Indicencias
