import React, { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import "./CSS/CheckoutPage.css";

const CheckoutPage = () => {
  const { getTotalCartAmount, cartItems, all_product, cartSizes, clearCart } = useContext(ShopContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", pincode: "",
    paymentMethod: "paytm"
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      alert("Order placed successfully!");
      clearCart(); // ✅ Reset cart after checkout
      navigate("/");
    }, 2000);
  };

  const totalAmount = (getTotalCartAmount() * 1.18).toFixed(2);

  const orderProducts = (all_product || []).filter(p => (cartItems[p.id] || 0) > 0);

  return (
    <div className="checkout-page">
  <div className="checkout-container">

    {/* Left: Shipping & Payment Form */}
    <div className="checkout-left">
      <h1 className="checkout-title">Checkout</h1>
      <p className="checkout-subtitle">Complete your purchase</p>

      <form onSubmit={handleSubmit} className="checkout-form">
        {/* Shipping Info */}
        <h2 className="section-title">Shipping Information</h2>

        <div className="form-row">
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} required />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} required />
        </div>

        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
        <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} required />
        <textarea name="address" placeholder="Address" rows="3" value={formData.address} onChange={handleInputChange} required></textarea>

        <div className="form-row">
          <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} required />
          <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleInputChange} required />
          <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleInputChange} required />
        </div>

        {/* Payment Method */}
        <h2 className="section-title">Payment Method</h2>
        <div className="payment-options">
          <label className="payment-option">
            <input type="radio" name="paymentMethod" value="paytm" checked={formData.paymentMethod === "paytm"} onChange={handleInputChange} />
            <div className="payment-icon">P</div>
            <span>Paytm (Get instant cashback)</span>
          </label>

          <label className="payment-option">
            <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === "card"} onChange={handleInputChange} />
            <div className="payment-icon">💳</div>
            <span>Credit/Debit Card</span>
          </label>

          <label className="payment-option">
            <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === "cod"} onChange={handleInputChange} />
            <div className="payment-icon">💰</div>
            <span>Cash on Delivery</span>
          </label>
        </div>

        <button type="submit" className={`submit-btn ${isProcessing ? 'loading' : ''}`} disabled={isProcessing}>
          {isProcessing ? 'Processing...' : `Pay ₹${totalAmount}`}
        </button>
      </form>
    </div>

    {/* Right: Order Summary */}
    <div className="checkout-right">
      <h2 className="summary-title">Order Summary</h2>

      <div className="order-items">
        {all_product.filter(p => cartItems[p.id] > 0).map(product => (
          <div key={product.id} className="order-item">
            <img src={product.image} alt={product.name} className="order-item-image" />
            <div className="order-item-details">
              <h4>{product.name}</h4>
              <p>Qty: {cartItems[product.id]} - Size: {cartSizes[product.id] || 'N/A'}</p>
            </div>
            <div className="order-item-price">₹{Number(String(product.new_price).replace(/[^0-9.]/g, "")) * cartItems[product.id]}</div>
          </div>
        ))}
      </div>

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
        <span>₹{totalAmount}</span>
      </div>

      {formData.paymentMethod === 'paytm' && (
        <div className="paytm-offer">
          Pay via Paytm for instant cashback up to ₹100!
        </div>
      )}
    </div>

  </div>
</div>

  );
};

export default CheckoutPage;
