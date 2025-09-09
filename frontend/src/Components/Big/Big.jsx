// src/Components/Big/Big.jsx
import React from "react";
import "./Big.css";
import BigImage from "../assets/BigImage.png";

const Big = () => {
  return (
    <section className="big">
      <div className="big-overlay">
        <h1 className="big-title">Elevate Your Style</h1>
        <p className="big-subtitle">
          Discover timeless pieces designed for confidence and comfort.
        </p>
        <button className="big-btn">Shop Now</button>
      </div>
      <img src={BigImage} alt="Full Length" className="big-img" />
    </section>
  );
};

export default Big;
