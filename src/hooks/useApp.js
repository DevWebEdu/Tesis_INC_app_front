import clienteAxios from "../config/axios"




const useApp =() =>{    
    const token = localStorage.getItem('AUTH_TOKEN')

    const getApplications = async (id) => {
        try {
            const {data} = await clienteAxios.get('/api/apps',{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            return data
        } catch (error) {
           console.log(error)
        }
    }


    return  {
        getApplications
    }
}



export default useApp