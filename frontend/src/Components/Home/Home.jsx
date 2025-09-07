import React from "react";
import "./Home.css";
import p1 from "../assets/p1.jpg";

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <img src={p1} alt="Bad Pari" className="p1" />
        <div className="hero-btns">
          <button className="btn">Shop Now</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
