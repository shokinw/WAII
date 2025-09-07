import React, { useEffect, useMemo, useState } from "react";

function Admin() {
  const initialForm = useMemo(
    () => ({ name: "", category: "", new_price: "", old_price: "", image: "" }),
    []
  );
  const [form, setForm] = useState(initialForm);
  const [imageFile, setImageFile] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files?.[0] || null);
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/products");
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to fetch products");
      setProducts(data.products || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const uploadImage = async () => {
    if (!imageFile) return "";
    const body = new FormData();
    body.append("image", imageFile);
    const res = await fetch("/upload", { method: "POST", body });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || "Image upload failed");
    return data.image_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      let imageUrl = form.image;
      if (!imageUrl) {
        imageUrl = await uploadImage();
      }

      const payload = {
        name: form.name.trim(),
        category: form.category.trim(),
        new_price: Number(form.new_price),
        old_price: Number(form.old_price),
        image: imageUrl,
      };

      const res = await fetch("/addproduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to add product");
      setForm(initialForm);
      setImageFile(null);
      await fetchProducts();
      alert("Product added");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`/deleteproduct/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to delete product");
      await fetchProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 16 }}>
      <h2>Admin</h2>
      {error && (
        <div style={{ background: "#ffe6e6", color: "#900", padding: 8, marginBottom: 12 }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, marginBottom: 24 }}>
        <div style={{ display: "grid", gap: 6 }}>
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleInputChange} required />
        </div>
        <div style={{ display: "grid", gap: 6 }}>
          <label>Category</label>
          <input name="category" value={form.category} onChange={handleInputChange} required />
        </div>
        <div style={{ display: "grid", gap: 6 }}>
          <label>New Price</label>
          <input name="new_price" type="number" step="0.01" value={form.new_price} onChange={handleInputChange} required />
        </div>
        <div style={{ display: "grid", gap: 6 }}>
          <label>Old Price</label>
          <input name="old_price" type="number" step="0.01" value={form.old_price} onChange={handleInputChange} required />
        </div>
        <div style={{ display: "grid", gap: 6 }}>
          <label>Image file (or paste URL below)</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <div style={{ display: "grid", gap: 6 }}>
          <label>Image URL (optional)</label>
          <input name="image" value={form.image} onChange={handleInputChange} placeholder="http://localhost:4000/images/..." />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Add Product"}
        </button>
      </form>

      <h3>Products ({products.length})</h3>
      {loading && <div>Loading...</div>}
      <div style={{ display: "grid", gap: 12 }}>
        {products.map((p) => (
          <div key={p.id} style={{ display: "flex", gap: 12, alignItems: "center", border: "1px solid #ddd", padding: 8 }}>
            <img src={p.image} alt={p.name} style={{ width: 60, height: 60, objectFit: "cover" }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: "#555" }}>{p.category}</div>
              <div style={{ fontSize: 12 }}>
                ${p.new_price} <span style={{ textDecoration: "line-through", color: "#888" }}>${p.old_price}</span>
              </div>
            </div>
            <button onClick={() => handleDelete(p.id)} disabled={loading}>Delete</button>
          </div>
        ))}
        {!products.length && !loading && <div>No products found.</div>}
      </div>
    </div>
  );
}

export default Admin;


