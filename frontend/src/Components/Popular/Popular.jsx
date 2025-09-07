import React from 'react'
import './Popular.css'
import all_product from '../assets/all_product.js'

const Popular = () => {
  return (
    <div className='popular'>
      <h2>POPULAR IN WOMEN</h2>
      <hr />
      <div className="popular-item">
        {all_product.slice(0,4).map((item, index) => (
          <div className="item" key={index}>
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <div className="item-prices">
              <div className="item-price-new">{item.new_price}</div>
              <div className="item-price-old">{item.old_price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Popular
