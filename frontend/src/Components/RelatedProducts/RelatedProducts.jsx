import React, { useContext } from 'react'
import './RelatedProducts.css'
import { ShopContext } from '../../Context/ShopContext'
import Item from '../Item/Item'

const RelatedProducts = ({ currentProductId }) => {
  const { all_product } = useContext(ShopContext);

  // show 4 products excluding the one being viewed
  const related = all_product
    .filter(item => item.id !== currentProductId)
    .slice(0, 4);

  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {related.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts
