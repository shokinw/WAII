import React from "react";
import Item from "../Components/Item/Item";
import all_product from "../Components/assets/all_product";
import "./CSS/ShopCategory.css";

const ShopCategory = ({ category }) => {
  return (
    <div className="shop-category-products">
      {all_product
        .filter((item) => item.category === category)
        .map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
    </div>
  );
};

export default ShopCategory;
