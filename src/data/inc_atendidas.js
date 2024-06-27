export const inc_atendidas = [
    {
      cod_inc: 'INC000555555',
      id_app: {
        cod_app: 1,
        nom_app: 'Gfiscal'
      },
      casuistica: "EDOCS  sin respuesta",// posibilidad de seleccionar una casuistica o si no existe agregarla
      time_attention: "10min",
      id_user: { 
        id : 1,
        username: "ejluna" },
      estado_at: "Resuelto",
      analisis_inc: "El usuario reporta EDOCS sin respuesta ",
      motivo_inc: " Existen SES que no han sido respondidos aun por consecuencia de formatos erroneos ",
      accion_done_inc: " Se procedio a separar del proceso los SES que encolaban el proceso",
      accion_user_inc: " Favor de verificar en el sistema "
    },
    {
      cod_inc: 'INC000444444',
      id_app: {
        cod_app: 2,
        nom_app: 'Pacifyc'
      },
      casuistica: "Ventas sin Liquidacion",// posibilidad de seleccionar una casuistica o si no existe agregarla
      time_attention: "20min",
      id_user:  { 
        id : 2,
        username: "lyactayo" },
      estado_at: "Resuelto",
      analisis_inc: "El usuario reporta ventas sin liquidacion SICESAC ",
      motivo_inc: " Existen Ventas de SiCESAC que no fueron procesadas correctamente por Pacifyc ",
      accion_done_inc: " Se procedio a volver a liquidar las ventas",
      accion_user_inc: " Favor de verificar en el sistema "
    },
    {
      cod_inc: 'INC000333333',
      id_app: {
        cod_app: 3,
        nom_app: 'Jerarquia de Ventas'
      },
      casuistica: "Error en carga de Bodegas",// posibilidad de seleccionar una casuistica o si no existe agregarla
      time_attention: "20min",
      id_user: { 
        id : 2,
        username: "mcorrea" },
      estado_at: "Resuelto",
      analisis_inc: "El usuario reporta  que no existen las bodegas cargadas",
      motivo_inc: " Las bodegas no fueron correctamente cargadas desde SAP ",
      accion_done_inc: " Se procedio a cargar las bodegas, filtrando las que ya existen en la maestra",
      accion_user_inc: " Favor de verificar en el sistema "
    }
  ]