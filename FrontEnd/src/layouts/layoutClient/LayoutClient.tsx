import React from 'react'
import { Outlet } from 'react-router-dom'
import Home from './Home'

const LayoutClient = () => {
  return (
    <div>
      <Home />
      <Outlet/>
    </div>
  )
}

export default LayoutClient