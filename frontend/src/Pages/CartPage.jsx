import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";
import "./CSS/CartPage.css";

const CartPage = () => {
  const { cartItems, all_product, removeFromCart, getTotalCartAmount } = useContext(ShopContext);

  const cartProducts = all_product.filter((p) => cartItems[p.id] > 0);

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div>
          <Link to="/" className="continue-shopping">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Continue Shopping
          </Link>
          
          <div className="cart-header">
            <h1 className="cart-title">
              Shopping Cart <span className="cart-subtitle">({cartProducts.length} Items)</span>
            </h1>
          </div>

          <div className="cart-items">
            {cartProducts.map((product) => (
              <div key={product.id} className="cart-item">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="product-image"
                />
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <div className="product-info">
                    <p>Size: <span>N/A</span></p>
                    <div className="quantity-selector">
                      <span>Qty:</span>
                      <select value={cartItems[product.id]} onChange={() => {}}>
                        {Array(5).fill("").map((_, index) => (
                          <option key={index} value={index + 1}>{index + 1}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="product-price">
                  {(() => {
                    const numeric = Number(String(product.new_price).replace(/[^0-9.]/g, "")) || 0;
                    const total = numeric * cartItems[product.id];
                    return `₹${total}`;
                  })()}
                </div>
                <button 
                  className="remove-btn" 
                  onClick={() => removeFromCart(product.id)}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h2 className="summary-title">Order Summary</h2>
          
          <div className="summary-item">
            <span className="summary-label">Subtotal:</span>
            <span className="summary-value">₹{getTotalCartAmount()}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Shipping:</span>
            <span className="summary-value free">FREE</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Tax:</span>
            <span className="summary-value">₹{(getTotalCartAmount() * 0.18).toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Total:</span>
            <span className="summary-total">₹{(getTotalCartAmount() * 1.18).toFixed(2)}</span>
          </div>
          
          <Link to="/checkout" className="checkout-btn">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
            Proceed to Checkout
          </Link>
          
          <div className="paytm-offer">
            <svg className="paytm-offer-icon" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className="paytm-text">Pay with Paytm for instant cashback!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
