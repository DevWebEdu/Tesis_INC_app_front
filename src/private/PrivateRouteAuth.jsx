import {  useNavigate } from 'react-router-dom';
import useAuth1 from '../hooks/useAuth1';
import { useEffect } from 'react';
import clienteAxios from '../config/axios';

const PrivateRouteAuth = ({element}) => {
    const {user,token,setUser} = useAuth1();
    const navigate = useNavigate()

    const getUser = async () => {
        clienteAxios('/api/user',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then(res=>setUser(res.data))
        .catch(error => {
            throw Error(error?.response?.data?.errors)
        })
    }

    
    useEffect(()=>{
        if(!token && !user){
            navigate('/auth/login')
        }
        if(!user && token) {
             getUser()
        }
    },[user])
    

    return element
}

export default PrivateRouteAuth


