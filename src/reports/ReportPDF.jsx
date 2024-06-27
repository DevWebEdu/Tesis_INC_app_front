import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Page, Document } from '@react-pdf/renderer'


const BORDER_COLOR = '#bfbfbf'
const BORDER_STYLE = 'solid'
const COL1_WIDTH = 40
const COLN_WIDTH = (100 - COL1_WIDTH) / 3
const styles = StyleSheet.create({
  body: {
    padding: 10
  },
  table: { 
    display: "table", 
    width: "auto", 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderWidth: 1, 
    borderRightWidth: 0, 
    borderBottomWidth: 0 
  }, 
  tableRow: { 
    margin: "auto", 
    flexDirection: "row" 
  }, 
  tableCol1Header: { 
    width: COL1_WIDTH + '%', 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0
  },     
  tableColHeader: { 
    width: COLN_WIDTH + "%", 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0
  },   
  tableCol1: { 
    width: COL1_WIDTH + '%', 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  },   
  tableCol: { 
    width: COLN_WIDTH + "%", 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  }, 
  tableCellHeader: {
    margin: 5, 
    fontSize: 12,
    fontWeight: 500
  },  
  tableCell: { 
    margin: 5, 
    fontSize: 10 
  }
});


const ReportPDF = ({ incidencias }) => {
    const [data, setData] = useState([])

    const modifyData = () => {
     
            const dataGfiscalEntradas = incidencias.filter(inc => inc.apps_id === 1) 
            const dataGfiscalSalidas = incidencias.filter(inc => inc.apps_id === 1 && inc.estado === 'resuelto') 
            const dataGfiscalBackLog = incidencias.filter(inc => inc.apps_id === 1 && inc.estado === 'atendiendo') 
            const dataPortalCEntradas = incidencias.filter(inc => inc.apps_id === 2)
            const dataPortalCSalidas =  incidencias.filter(inc => inc.apps_id === 2 && inc.estado === 'resuelto') 
            const dataPortalCBackLog = incidencias.filter(inc => inc.apps_id === 2 && inc.estado === 'atendiendo') 
            const dataJVEntradas = incidencias.filter(inc => inc.apps_id === 3) 
            const dataJVSalidas =  incidencias.filter(inc => inc.apps_id === 3 && inc.estado === 'resuelto')
            const dataJVBackLog =  incidencias.filter(inc => inc.apps_id === 3 && inc.estado === 'atendiendo') 
            const dataSivadacEntradas =  incidencias.filter(inc => inc.apps_id === 4) 
            const dataSivadacSalidas =  incidencias.filter(inc => inc.apps_id === 4 && inc.estado === 'resuelto') 
            const dataSivadacBackLog =  incidencias.filter(inc => inc.apps_id === 4 && inc.estado === 'atendiendo') 
            const dataPacifycEntradas = incidencias.filter(inc => inc.apps_id === 5) 
            const dataPacifycSalidas = incidencias.filter(inc => inc.apps_id === 5 && inc.estado === 'resuelto')
            const dataPacifycBackLog =  incidencias.filter(inc => inc.apps_id === 5 && inc.estado === 'atendiendo') 


            const datos = {
                "GfiscalEntrada": dataGfiscalEntradas.length,
                "GfiscalSalidas": dataGfiscalSalidas.length,
                "GfiscalBackLog": dataGfiscalBackLog.length,
                 "PortalCEntrada": dataPortalCEntradas.length,
                 "PortalCSalidas": dataPortalCSalidas.length,
                 "PortalCBackLog": dataPortalCBackLog.length,
                 "JVEntrada": dataJVEntradas.length,
                 "JVSalidas": dataJVSalidas.length,
                 "JVBackLog": dataJVBackLog.length,
                 "SivadacEntrada": dataSivadacEntradas.length,
                 "SivadacSalidas": dataSivadacSalidas.length,
                 "SivadacBackLog": dataSivadacBackLog.length,
                 "PacifycEntrada": dataPacifycEntradas.length,
                "PacifycSalidas": dataPacifycSalidas.length,
                 "PacifycBackLog": dataPacifycBackLog.length,
            }
            setData(datos)


        //console.log(numeroMayor ? numeroMayor.fecha_envio : "cargando")
        //const nuevafechaFormateada = numeroMayor ? new Date(numeroMayor.fecha_envio) : []
        //console.log(nuevafechaFormateada ? new Date (nuevafechaFormateada.setDate(nuevafechaFormateada.getDate() - 3)) : "cargando")
    }
    useEffect(() => {
        modifyData()
    }, [incidencias])
    return (
        <Document>
        <Page style={styles.body} size={"A4"} orientation={"portrait"}>
          <View style={styles.table}> 
            <View style={styles.tableRow}> 
              <View style={styles.tableCol1Header}> 
                <Text style={styles.tableCellHeader}>Aplicacion</Text> 
              </View> 
              <View style={styles.tableColHeader}> 
                <Text style={styles.tableCellHeader}>Entradas</Text> 
              </View> 
              <View style={styles.tableColHeader}> 
                <Text style={styles.tableCellHeader}>Salidas</Text> 
              </View> 
              <View style={styles.tableColHeader}> 
                <Text style={styles.tableCellHeader}>BackLog</Text> 
              </View> 
            </View>
            <View style={styles.tableRow}> 
              <View style={styles.tableCol1}> 
                <Text style={styles.tableCell}>Gfiscal</Text> 
              </View> 
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{data.GfiscalEntrada  }</Text> 
              </View> 
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.GfiscalSalidas}</Text> 
              </View>
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{data.GfiscalBackLog}</Text> 
              </View> 
            </View> 
            <View style={styles.tableRow}> 
              <View style={styles.tableCol1}> 
                <Text style={styles.tableCell}>Portal Comercial</Text> 
              </View> 
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{data.PortalCEntrada}</Text> 
              </View> 
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.PortalCSalidas}</Text> 
              </View>
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{data.PortalCBackLog}</Text> 
              </View> 
            </View>
            <View style={styles.tableRow}> 
              <View style={styles.tableCol1}> 
                <Text style={styles.tableCell}>Jerarquia de Ventas</Text> 
              </View> 
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{data.JVEntrada}</Text> 
              </View> 
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.JVSalidas}</Text> 
              </View>
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{data.JVBackLog}</Text> 
              </View> 
            </View>
            <View style={styles.tableRow}> 
              <View style={styles.tableCol1}> 
                <Text style={styles.tableCell}>Sivadac</Text> 
              </View> 
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{data.SivadacEntrada}</Text> 
              </View> 
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.SivadacSalidas}</Text> 
              </View>
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{data.SivadacBackLog}</Text> 
              </View> 
            </View>
            <View style={styles.tableRow}> 
              <View style={styles.tableCol1}> 
                <Text style={styles.tableCell}>Pacifyc</Text> 
              </View> 
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{data.PacifycEntrada}</Text> 
              </View> 
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.PacifycSalidas}</Text> 
              </View>
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{data.PacifycBackLog}</Text> 
              </View> 
            </View>
          </View>
        </Page>
      </Document>
    )
}

export default ReportPDF
