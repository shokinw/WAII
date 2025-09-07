import React, { useState } from "react";
import "./AddProduct.css";

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [productdetails, setProductDetails] = useState({
    name: "",
    old_price: "",
    new_price: "",
    category: "Kurti",
    image: ""
  });

  // Handle input changes
  const changeHandler = (e) => {
    setProductDetails({ ...productdetails, [e.target.name]: e.target.value });
  };

  // Upload product
  const Add_Product = async () => {
    console.log("Before upload:", productdetails);

    let responseData;
    let product = { ...productdetails };

    // Convert prices to numbers (backend expects Number)
    product.new_price = Number(product.new_price);
    product.old_price = Number(product.old_price);

    // First upload image
    let formData = new FormData();
    formData.append("image", image);

    try {
      let resp = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });

      responseData = await resp.json();
      console.log("Upload response:", responseData);

      if (responseData.success) {
        product.image = responseData.image_url;
        console.log("After upload, before save:", product);

        let addResp = await fetch("http://localhost:4000/addproduct", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        });

        let addResult = await addResp.json();
        console.log("Product saved:", addResult);

        if (addResult.success) {
          alert("✅ Product added successfully!");
          setProductDetails({
            name: "",
            old_price: "",
            new_price: "",
            category: "Kurti",
            image: "",
          });
          setImage(null);
        } else {
          alert("❌ Failed to save product: " + addResult.message);
        }
      } else {
        alert("❌ Image upload failed: " + responseData.message);
      }
    } catch (error) {
      console.error("Error while adding product:", error);
    }
  };

  return (
    <div className="add-product">
  <h2 className="form-title">Add New Product</h2>

  <div className="addproduct-itemfield">
    <label className="label">Product Title</label>
    <input
      type="text"
      name="name"
      value={productdetails.name}
      onChange={changeHandler}
      placeholder="Enter product name"
    />
  </div>

  <div className="grid-2">
    <div className="addproduct-itemfield">
      <label className="label">Old Price</label>
      <input
        type="number"
        name="old_price"
        value={productdetails.old_price}
        onChange={changeHandler}
        placeholder="Enter old price"
      />
    </div>

    <div className="addproduct-itemfield">
      <label className="label">New Price</label>
      <input
        type="number"
        name="new_price"
        value={productdetails.new_price}
        onChange={changeHandler}
        placeholder="Enter new price"
      />
    </div>
  </div>

  <div className="addproduct-itemfield">
    <label className="label">Category</label>
    <select
      className="category-dropdown"
      name="category"
      value={productdetails.category}
      onChange={changeHandler}
    >
      <option value="Kurti">Kurti</option>
      <option value="Bestseller">Bestseller</option>
      <option value="More">More</option>
      <option value="New">New</option>
      <option value="sale">Sale</option>
    </select>
  </div>

  <div className="addproduct-itemfield">
    <label className="label">Product Image</label>
    <label className="upload-box">
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => setImage(e.target.files[0])}
      />
      {image ? (
        <img src={URL.createObjectURL(image)} alt="Preview" />
      ) : (
        <span className="upload-hint">Click to upload</span>
      )}
    </label>
  </div>

  <button className="addproduct-submitbtn" onClick={Add_Product}>
    Add Product
  </button>
</div>
  )
};
export default AddProduct;