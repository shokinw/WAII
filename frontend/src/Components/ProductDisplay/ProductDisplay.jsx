import React, { useContext, useState } from 'react';
import './ProductDisplay.css';
import star_icon from "../assets/star_icon.png";
import star_dull_icon from "../assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {
  const { product } = props;
  const {addToCart}=useContext(ShopContext);
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {[1, 2, 3, 4].map((_, i) => (
            <img key={i} src={product.image} alt={`thumbnail-${i}`} />
          ))}
        </div>
        <div className="productdisplay-img">
          <img className='productdisplay-main-img' src={product.image} alt={product.name} />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_dull_icon} alt="star dull" />
          <p>(222)</p>
        </div>
        <div className="productdisplay-right-prices">
            <div className="productdisplay-right-price-old">{product.old_price}</div>
            <div className="productdisplay-right-price-new">{product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
            A lightweigth , usejkdnvjdkn,bkjfdbb bjdb jlsbj b klb bfg bfh n fgn fn  ndf n  h hkjbndffng bjbgjigb

        </div>
        <div className="productdisplay-right-size">
            <h1>Select Sixe</h1>
            <div className="productdisplay-right-size">
                <div>S</div>
                <div>M</div>
                <div>L</div>
                <div>XL</div>
                <div>XXL</div>
            </div>

        </div>
        <button 
          onClick={() => {
            addToCart(product.id);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2000);
          }}
          className={showSuccess ? 'success' : ''}
        >
          {showSuccess ? '✓ ADDED TO CART!' : 'ADD TO CART'}
        </button>
        <p className='productdisplay-roght-category'><span>Category :</span> Women,T-shirt, croptop</p>
         <p className='productdisplay-roght-category'><span>Tags:</span> Modern, lastest</p>
       
      </div>
    </div>
  );
};

export default ProductDisplay;
