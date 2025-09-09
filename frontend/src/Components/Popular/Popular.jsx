import React from "react";
import "./Popular.css";
import all_product from "../assets/all_product.js";
import { Link } from "react-router-dom";

const Popular = () => {
  return (
    <div className="popular">
      <h2>Popular Picks</h2>
      <hr />
      <div className="popular-scroll">
        {all_product.slice(0, 4).map((item, index) => (
          <Link
            to={`/product/${item.id}`}
            key={index}
            className="item-link"
            onClick={() => window.scrollTo(0, 0)}
          >
            <div className="item">
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <div className="item-prices">
                <span className="item-price-new">{item.new_price}</span>
                <span className="item-price-old">{item.old_price}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Popular;
