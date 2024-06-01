import React from 'react'

function CardAtention({ atention }) {
    const { user, time_atcn, inc } = atention
    return (
        <div className='shadow-2xl p-5 border-l-8 bg-white border-regal-blue rounded-md text-sm'>
            <div className=' flex justify-between  font-bold'>
                <h5  > {user} </h5>
                <span> {time_atcn}  </span>
            </div>
            <p className='font-bold  text-gray-500 mt-3'> {inc}</p>
        </div>
    )
}

export default CardAtention