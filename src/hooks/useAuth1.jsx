import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

 const useAuth1 = () => {
  return useContext(AuthContext)
}

export default useAuth1