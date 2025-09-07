import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import AddProduct from './Components/AddProduct/AddProduct'
import ListProduct from './Components/ListProduct/ListProduct'
import Order from './Components/Order/Order'
import './App.css'

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-layout">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/addproduct" replace />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/listproduct" element={<ListProduct />} />
            <Route path="/orders" element={<Order />} />
            <Route path="*" element={<Navigate to="/addproduct" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
