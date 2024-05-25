import React from 'react'
import { NavLink } from 'react-router-dom'

const LinkModule = ({ link }) => {
  return (

    <NavLink to={link.path} key={link.id} className={({ isActive }) =>
      isActive ?
        "bg-indigo-500  gap-4   p-3 cursor-pointer py-10 rounded-md  "
        : "gap-4   p-3 hover:bg-indigo-300 py-10 rounded-md "
    }>
      <p className='text-md uppercase font-bold cursor-pointer truncate text-white text-center  '

      > {link.name}</p>

    </NavLink>

  )
}

export default LinkModule
