import React, { useState, useEffect } from "react";
import "./AuthModal.css";

const AuthModal = ({ type, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(type === "login");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  // update when Navbar changes type
  useEffect(() => {
    setIsLogin(type === "login");
  }, [type]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Fake authentication (replace with API later)
    let newUser;
    if (isLogin) {
      newUser = { name: "Guest", email: formData.email };
    } else {
      newUser = { name: formData.name, email: formData.email };
    }

    localStorage.setItem("user", JSON.stringify(newUser));
    onSuccess(newUser); // pass user back to Navbar
    onClose();
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button className="close-btn" onClick={onClose}>✖</button>

        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>

        <p>
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <span
            className="toggle-auth"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
