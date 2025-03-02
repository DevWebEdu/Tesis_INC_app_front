import React, { useEffect } from 'react'
import useAuth1 from '../hooks/useAuth1'
import { useNavigate } from 'react-router-dom'

const PrivateRouteAdmin = ({element}) => {

    const {user, token} = useAuth1()
    const navigate = useNavigate()

    useEffect(() => {
        if ( user?.admin == '0'){   
            navigate('/')
        }
        if(!token && !user){
            navigate('/auth/login')
        }
    }, [user]);


  return element
}

export default PrivateRouteAdmin