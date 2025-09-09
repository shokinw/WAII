import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";
import "./CSS/CartPage.css";

const CartPage = () => {
  const { cartItems, cartSizes, all_product, removeFromCart, updateCartQuantity, selectSize, getTotalCartAmount } = useContext(ShopContext);

  // ✅ Safe filter in case all_product or cartItems are undefined
  const cartProducts = (all_product || []).filter(p => (cartItems[p.id] || 0) > 0);

  return (
    <div className="cart-page">
  <div className="cart-container">

    {/* Left: Cart Items */}
    <div className="cart-left">
      <Link to="/" className="continue-shopping">← Continue Shopping</Link>
      <h1 className="cart-title">Shopping Cart ({cartProducts.length} Items)</h1>

      {cartProducts.length > 0 ? (
        <div className="cart-items">
          {cartProducts.map(product => (
            <div key={product.id} className="cart-item">
              <img src={product.image} alt={product.name} className="product-image" />

              <div className="product-info">
                <h3>{product.name}</h3>
                
                <div className="product-meta">
                  <label>
                    Size: 
                    <select
                      value={cartSizes[product.id] || (product.sizes ? product.sizes[0] : "N/A")}
                      onChange={(e) => selectSize(product.id, e.target.value)}
                    >
                      {(product.sizes || []).map(size => <option key={size}>{size}</option>)}
                    </select>
                  </label>

                  <label>
                    Qty:
                    <select
                      value={cartItems[product.id]}
                      onChange={(e) => updateCartQuantity(product.id, e.target.value)}
                    >
                      {Array(10).fill("").map((_, i) => <option key={i + 1}>{i + 1}</option>)}
                    </select>
                  </label>
                </div>
              </div>

              <div className="product-price">
                ₹{Number(String(product.new_price).replace(/[^0-9.]/g, "")) * cartItems[product.id]}
              </div>

              <button className="remove-btn" onClick={() => removeFromCart(product.id)}>❌</button>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-cart">Your cart is empty</p>
      )}
    </div>

    {/* Right: Order Summary */}
    <div className="cart-right">
      <h2>Order Summary</h2>
      <div className="summary-row">
        <span>Subtotal:</span>
        <span>₹{getTotalCartAmount()}</span>
      </div>
      <div className="summary-row">
        <span>Shipping:</span>
        <span>FREE</span>
      </div>
      <div className="summary-row">
        <span>Tax (18%):</span>
        <span>₹{(getTotalCartAmount() * 0.18).toFixed(2)}</span>
      </div>
      <div className="summary-row total">
        <span>Total:</span>
        <span>₹{(getTotalCartAmount() * 1.18).toFixed(2)}</span>
      </div>

      {cartProducts.length > 0 && (
        <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>
      )}
    </div>
  </div>
</div>
  );
}

export default CartPage;