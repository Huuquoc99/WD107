import React from 'react'
import { Outlet } from 'react-router-dom'

const PrivateRouter = () => {
    const user = JSON.parse(localStorage.getItem("user")||"{}");
    if(user && user?.role === "admin") return<Outlet/>
  return <h1 className='text-white' >Bạn không có quyền truy cập</h1>
    
  
}

export default PrivateRouter
