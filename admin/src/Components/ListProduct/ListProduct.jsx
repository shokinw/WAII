import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from "../../assets/cross_icon.png";

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch products
  const fetchInfo = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://wai-backend-jamo.onrender.com/allproducts");
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to load products");
      setAllProducts(data.products || []);
    } catch (err) {
      console.error('Load products error:', err);
      setAllProducts([]);
    }
    setLoading(false);
  };

  // Delete product
  const removeProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`https://wai-backend-jamo.onrender.com/deleteproduct/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok || !data.success) throw new Error(data.message || "Failed to delete");

      // Refresh list from backend
      fetchInfo();
      alert("✅ Product deleted successfully!");
    } catch (err) {
      console.error("Delete product error:", err);
      alert("❌ Failed to delete product!");
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className='list-product'>
      <h1>All Products List</h1>

      {/* Loader */}
      {loading && <p style={{ textAlign: "center" }}>Loading products...</p>}

      {/* Header row */}
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      {/* Products */}
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.length === 0 && !loading && (
          <p style={{ textAlign: "center", marginTop: "20px" }}>No products found</p>
        )}

        {allproducts.map((product) => (
          <div key={product.id} className='listproduct-format-main listproduct-format'>
            <img src={product.image} alt={product.name} className="listproduct-product-icon" />
            <p>{product.name}</p>
            <p>₹{product.old_price}</p>
            <p>₹{product.new_price}</p>
            <p>{product.category}</p>
            <img
              className='listproduct-remove-icon'
              src={cross_icon}
              alt="remove"
              onClick={() => removeProduct(product.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
