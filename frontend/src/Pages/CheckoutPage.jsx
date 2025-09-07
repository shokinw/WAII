import React, { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import "./CSS/CheckoutPage.css";

const CheckoutPage = () => {
  const { getTotalCartAmount, cartItems, all_product } = useContext(ShopContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "paytm"
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      alert("Order placed successfully! You will receive a confirmation email shortly.");
      navigate("/");
    }, 2000);
  };

  const totalAmount = (getTotalCartAmount() * 1.18).toFixed(2);

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <h1 className="checkout-title">Checkout</h1>
          <p className="checkout-subtitle">Complete your purchase</p>
        </div>

        <div className="checkout-grid">
          {/* Checkout Form */}
          <div className="checkout-form">
            <h2 className="form-title">Shipping Information</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label required">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label required">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label required">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label required">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label required">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="form-input form-textarea"
                />
              </div>

              <div className="form-row-3">
                <div className="form-group">
                  <label className="form-label required">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label required">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label required">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div className="payment-section">
                <h3 className="payment-title">Payment Method</h3>
                
                <div className="payment-options">
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paytm"
                      checked={formData.paymentMethod === "paytm"}
                      onChange={handleInputChange}
                    />
                    <div className="payment-icon paytm">P</div>
                    <div className="payment-details">
                      <h4>Paytm</h4>
                      <p>Get instant cashback up to ₹100</p>
                    </div>
                  </label>

                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={handleInputChange}
                    />
                    <div className="payment-icon card">💳</div>
                    <div className="payment-details">
                      <h4>Credit/Debit Card</h4>
                      <p>Visa, Mastercard, RuPay</p>
                    </div>
                  </label>

                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleInputChange}
                    />
                    <div className="payment-icon cod">💰</div>
                    <div className="payment-details">
                      <h4>Cash on Delivery</h4>
                      <p>Pay when you receive</p>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className={`submit-btn ${isProcessing ? 'loading' : ''}`}
              >
                {isProcessing ? "Processing..." : `Pay ₹${totalAmount}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h2 className="summary-title">Order Summary</h2>
            
            <div className="order-items">
              {all_product
                .filter(product => cartItems[product.id] > 0)
                .map(product => (
                  <div key={product.id} className="order-item">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="order-item-image"
                    />
                    <div className="order-item-details">
                      <h4 className="order-item-name">{product.name}</h4>
                      <p className="order-item-qty">Qty: {cartItems[product.id]}</p>
                    </div>
                    <div className="order-item-price">
                      ₹{product.new_price}
                    </div>
                  </div>
                ))}

              <div className="price-breakdown">
                <div className="price-row">
                  <span className="price-label">Subtotal:</span>
                  <span className="price-value">₹{getTotalCartAmount()}</span>
                </div>
                <div className="price-row">
                  <span className="price-label">Shipping:</span>
                  <span className="price-value free">FREE</span>
                </div>
                <div className="price-row">
                  <span className="price-label">Tax (18%):</span>
                  <span className="price-value">₹{(getTotalCartAmount() * 0.18).toFixed(2)}</span>
                </div>
                <div className="price-row total">
                  <span className="price-label">Total:</span>
                  <span className="price-value total">₹{totalAmount}</span>
                </div>
              </div>

              {formData.paymentMethod === "paytm" && (
                <div className="paytm-offer">
                  <svg className="paytm-offer-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div className="paytm-offer-title">Paytm Cashback Offer!</div>
                  <p className="paytm-offer-text">
                    Get instant cashback up to ₹100 on your first Paytm payment
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
