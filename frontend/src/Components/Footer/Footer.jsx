import React from "react";
import "./Footer.css";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Top Section */}
      <div className="footer-top">
        <div className="footer-about">
          <img className="footer-logo" src={logo} alt="WAI Logo" />
          <p>
            Curated fashion & lifestyle. Designed for elegance, comfort,
            and individuality.
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-section">
            <h3>Shop</h3>
            <ul>
              <li><a href="/">New Arrivals</a></li>
              <li><a href="/">Best Sellers</a></li>
              <li><a href="/">Sale</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Help</h3>
            <ul>
              <li><a href="/">Contact</a></li>
              <li><a href="/">Returns</a></li>
              <li><a href="/">FAQs</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <ul>
              <li><a href="/">Instagram</a></li>
              <li><a href="/">Facebook</a></li>
              <li><a href="/">YouTube</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} WAI | All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
