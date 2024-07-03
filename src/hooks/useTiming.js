import React from 'react'
import clienteAxios from '../config/axios'

export const useTiming = () => {

    const agregandoDataCronometrada = async (datos) => {
        const data = await clienteAxios.post('/api/timing',datos)
        return data
    }


  return {
        agregandoDataCronometrada,
  }
}
