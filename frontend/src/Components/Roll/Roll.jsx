import React from 'react'
import './Roll.css'
import data_product from '../assets/data_product.js'

const Popular = () => {
  return (
    <div className='popular'>
      <h2>BEST Of WAI</h2>
      <hr />
      <div className="popular-item">
        {data_product.map((item, index) => {
          return (
            <div className="item" key={index}>
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Popular
