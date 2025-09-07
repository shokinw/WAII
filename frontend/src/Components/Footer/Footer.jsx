import React from "react";
import "./Footer.css";
import logo from "../assets/logo.png";

const Footer = () => {
  const linkSections = [
    {
      title: "Quick Links",
      links: ["Home", "Best Sellers", "Offers & Deals", "Contact Us", "FAQs"],
    },
    {
      title: "Need Help?",
      links: [
        "Delivery Information",
        "Return & Refund Policy",
        "Payment Methods",
        "Track Your Order",
        "Contact Us",
      ],
    },
    {
      title: "Follow Us",
      links: ["Instagram", "Twitter", "Facebook", "YouTube"],
    },
  ];

  return (
    <footer className="footer">
      {/* Top Section */}
      <div className="footer-top">
        {/* Logo + About */}
        <div className="footer-about">
          <img className="footer-logo" src={logo} alt="WAI Logo" />
          <p>
            Discover the best deals and quality products with us. We bring
            fashion, value, and trust to your shopping experience.
          </p>
        </div>

        {/* Links Section */}
        <nav className="footer-links">
          {linkSections.map((section, index) => (
            <div key={index} className="footer-section">
              <h3>{section.title}</h3>
              <ul>
                {section.links.map((link, i) => (
                  <li key={`${section.title}-${i}`}>
                   
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()}{" "}
          <a href="https://wai.com" target="_blank" rel="noreferrer">
           India
          </a>{" "}
          | All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
