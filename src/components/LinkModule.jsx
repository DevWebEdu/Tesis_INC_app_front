import React from 'react'
import { NavLink } from 'react-router-dom'

const LinkModule = ({ link }) => {
  return (

    <NavLink to={link.path} key={link.id} className={({ isActive }) =>
      isActive ?
        "bg-regal-blue text-white rounded-md p-3 cursor-pointer py-10  "
        : "gap-4   p-3 rounded-md py-10  "
    }>
      <p className='text-md uppercase font-bold cursor-pointer truncate  text-center  '

      > {link.name}</p>

    </NavLink>

  )
}

export default LinkModule
