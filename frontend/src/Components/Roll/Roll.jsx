import React from "react";
import { Link } from "react-router-dom";
import "./Roll.css";
import data_product from "../assets/data_product.js";

const Roll = () => {
  return (
    <div className="section">
      <h2>Popular Picks</h2>
      <hr />
      <div className="scroll-row">
        {data_product.map((item, index) => (
          <Link
            to={`/product/${item.id}`}
            key={index}
            className="item-link"
            onClick={() => window.scrollTo(0, 0)}
          >
            <div className="item">
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Roll;
