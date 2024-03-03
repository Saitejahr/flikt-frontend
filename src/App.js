import React from 'react'
import { Route, Routes } from 'react-router-dom'

import './App.css'
import Headers from './components/Header'
import Register from './components/Register'
import Login from './components/Login'
import Table from './components/Table'

function App() {
  return (
    <div className="container">
      <Headers />

      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/table" element={<Table />} />
      </Routes>
    </div>
  )
}

export default App
