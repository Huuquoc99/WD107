import { useState } from 'react'

import './App.css'

import { Route, Routes } from 'react-router-dom'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
