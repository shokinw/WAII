import React from "react";
import "./Offers.css"; // Import CSS file
import p3 from "../assets/p3.jpg";
import p4 from "../assets/p4.jpg";
import p5 from "../assets/p5.jpg";

const Offers = () => {
  return (
    <div className="offers">
      {/* Title Section */}
      <h1 className="offers-title">Our Latest Creations</h1>
      <p className="offers-subtitle">
        A visual collection of our most recent works - each piece crafted with intention, emotion, and style.
      </p>

      {/* Cards Section */}
      <div className="offers-cards">
        {/* Card 1 */}
        <div className="offer-card">
          <img src={p3} alt="Boss Girly" className="offer-image" />
          <div className="offer-overlay">
            <h2 className="offer-card-title">Boss Girly</h2>
            <p className="offer-card-desc">
              Bridging the gap between human intent and machine understanding through expert prompt design.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="offer-card">
          <img src={p4} alt="Being a Beauty Rani" className="offer-image" />
          <div className="offer-overlay">
            <h2 className="offer-card-title">Being a Beauty Rani</h2>
            <p className="offer-card-desc">
              Turning complex data into actionable insights that drive meaningful decisions.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="offer-card">
          <img src={p5} alt="Engineer Girl" className="offer-image" />
          <div className="offer-overlay">
            <h2 className="offer-card-title">Engineer Girl</h2>
            <p className="offer-card-desc">
              Designing scalable systems and intuitive apps to bring ideas to life.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
