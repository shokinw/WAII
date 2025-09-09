import React, { useContext } from "react";
import Item from "../Components/Item/Item";
import all_product from "../Components/assets/all_product";
import { ShopContext } from "../Context/ShopContext";
import "./CSS/ShopCategory.css";

const ShopCategory = ({ category }) => {
  const { addToCart, cartSizes, selectSize } = useContext(ShopContext);

  const filteredProducts = (all_product || []).filter(item => item.category === category);

  return (
    <div className="shop-category-products">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
            sizes={item.sizes || []}                 // ✅ pass sizes
            selectedSize={cartSizes[item.id] || (item.sizes ? item.sizes[0] : "N/A")}
            onSelectSize={(size) => selectSize(item.id, size)}
            onAddToCart={() => addToCart(item.id)}
          />
        ))
      ) : (
        <p>No products in this category</p>
      )}
    </div>
  );
};

export default ShopCategory;
