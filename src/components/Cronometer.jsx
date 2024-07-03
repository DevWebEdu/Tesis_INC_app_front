import React, { useEffect, useState } from 'react'

export const Cronometer = ({ObteniendoDatosCronometro}) => {

    const [seconds,setSeconds] = useState(0)
    const [minutes,setMinutes] = useState(0)
    var timer;

    


    useEffect(() => {
    timer =  setInterval(()=>{
        ObteniendoDatosCronometro({minutes,seconds})
        setSeconds(seconds+1)
        if(seconds === 59){
            setMinutes(minutes+1)
            setSeconds(0)
        }
        
    },1000)
    
    return () => {
        clearInterval(timer)
     
    }

    })
    


  return (
    <div className='text-2xl  font-black mt-4 flex justify-around gap-3 '>
        <div className='bg-regal-blue text-white p-1 rounded-md'>
                {minutes < 10 ? "0"+minutes : minutes}
        </div>
        <span> : </span>
        <div className='bg-regal-blue text-white p-1 rounded-md'>
                {seconds < 10 ? "0"+seconds : seconds}
        </div>
    </div>
  )
}
