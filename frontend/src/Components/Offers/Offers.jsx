import React from "react";
import "./Offers.css";
import p3 from "../assets/p3.jpg";
import p4 from "../assets/p4.jpg";
import p5 from "../assets/p5.jpg";

const Offers = () => {
  const offers = [
    {
      img: p3,
      title: "Boss Girly",
      desc: "Confident fits for bold personalities.",
    },
    {
      img: p4,
      title: "Being a Beauty Rani",
      desc: "Elegance meets attitude, a perfect blend of style.",
    },
    {
      img: p5,
      title: "Engineer Girl",
      desc: "Power dressing with a touch of softness.",
    },
  ];

  return (
    <section className="offers">
      <h1 className="offers-title">Our Latest Creations</h1>
      <p className="offers-subtitle">
        A visual collection of our most recent works – crafted with intention,
        emotion, and style.
      </p>

      <div className="offers-row">
        {offers.map((item, index) => (
          <div className="offer-card" key={index}>
            <img src={item.img} alt={item.title} />
            <div className="offer-overlay">
              <h2>{item.title}</h2>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Offers;
