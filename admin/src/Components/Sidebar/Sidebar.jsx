import React from 'react'
import './Sidebar.css'
import add_product_icon from '../../assets/Product_Cart.svg'
import list_product_icon from '../../assets/Product_list_icon.svg'
import order_icon from '../../assets/order_icon.jpg'   // ✅ create/add an order icon
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/addproduct" style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={add_product_icon} alt="Add Product" />
          <p>Add Product</p>
        </div>
      </Link>

      <Link to="/listproduct" style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={list_product_icon} alt="Product List" />
          <p>Product List</p>
        </div>
      </Link>

      {/* ✅ New Orders link */}
      <Link to="/orders" style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={order_icon} alt="Orders" />
          <p>Orders</p>
        </div>
      </Link>
    </div>
  )
}

export default Sidebar
