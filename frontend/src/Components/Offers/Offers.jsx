import React from "react";
import "./Offers.css"; // 👈 import CSS file
import p3 from "../assets/p3.jpg";
import p4 from "../assets/p4.jpg";
import p5 from "../assets/p5.jpg";

const Offers = () => {
  return (
    <div className="offers">
      {/* Title */}
      <h1 className="offers-title">Our Latest Creations</h1>
      <p className="offers-subtitle">
        A visual collection of our most recent works - each piece crafted with
        intention, emotion, and style.
      </p>

      {/* Card Section */}
      <div className="offers-cards">
        {/* Card 1 */}
        <div className="offer-card">
          <img src={p3} alt="Prompt engineers" />
          <div className="offer-overlay">
            <h1>Boss Girly</h1>
            <p>
              Bridging the gap between human intent and machine understanding
              through expert prompt design.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="offer-card">
          <img src={p4} alt="Data scientists" />
          <div className="offer-overlay">
            <h1>Being a Beauty Rani</h1>
            <p>
              Turning complex data into actionable insights that drive meaningful
              decisions.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="offer-card">
          <img src={p5} alt="Software engineers" />
          <div className="offer-overlay">
            <h1>Engineer Girl</h1>
            <p>
              Designing scalable systems and intuitive apps to bring ideas to life.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
