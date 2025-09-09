import React from "react";
import "./Home.css";
import p1 from "../assets/p1.jpg";

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <img src={p1} alt="Hero Banner" className="p1" />
        <div className="hero-btns">
          <button className="btn">Shop Now</button>
          <button className="btn-outline">Explore</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
