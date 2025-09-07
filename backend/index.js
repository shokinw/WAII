const port = process.env.PORT ||4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

// Load environment variables from .env
require("dotenv").config();

app.use(express.json());
app.use(cors());

// ------------------- DATABASE CONNECTION -------------------
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
} else {
  console.warn("⚠️  MONGO_URI not set; skipping MongoDB connection");
}

// ------------------- ROOT API -------------------
app.get("/", (req, res) => {
  res.send("🚀 ExpressApp is Running");
});

// ------------------- FILE UPLOAD -------------------

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "upload", "images");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}_${Date.now()}${ext}`);
  },
});

const upload = multer({ storage: storage });

// Serve images statically
app.use("/images", express.static(path.join(__dirname, "upload", "images")));

// Upload API
app.post("/upload", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: 0, message: "No file uploaded" });
    }

    res.json({
      success: 1,
      image_url: `http://localhost:${port}/images/${req.file.filename}`,
    });
  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({
      success: 0,
      message: "Upload failed",
      error: error.message,
    });
  }
});

// ------------------- PRODUCT SCHEMA -------------------
const productSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
});

const Product = mongoose.model("Product", productSchema);

// ------------------- ORDER SCHEMA -------------------
const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Clerk userId or customer identifier
  products: [
    {
      productId: { type: Number, required: true },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  date: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

// ------------------- PRODUCT ROUTES -------------------

// Add product
app.post("/addproduct", async (req, res) => {
  try {
    let products = await Product.find({});
    let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const { name, image, category, new_price, old_price } = req.body;

    if (!name || !image || !category || !new_price || !old_price) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const product = new Product({ id, name, image, category, new_price, old_price });
    await product.save();

    res.json({ success: true, message: "Product saved successfully", product });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to save product", error: err.message });
  }
});

// Get all products
app.get("/allproducts", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, count: products.length, products });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch products", error: err.message });
  }
});

// Delete product
app.delete("/deleteproduct/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await Product.findOneAndDelete({ id });

    if (!deleted) return res.status(404).json({ success: false, message: "Product not found" });

    res.json({ success: true, message: "Product deleted successfully", deleted });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete product", error: err.message });
  }
});

// Update product
app.put("/updateproduct/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updated = await Product.findOneAndUpdate({ id }, req.body, { new: true });

    if (!updated) return res.status(404).json({ success: false, message: "Product not found" });

    res.json({ success: true, message: "Product updated successfully", updated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update product", error: err.message });
  }
});

// ------------------- ORDER ROUTES -------------------

// Place order (customer)
app.post("/order", async (req, res) => {
  try {
    const { userId, products, totalAmount } = req.body;
    const order = new Order({ userId, products, totalAmount });
    await order.save();
    res.json({ success: true, message: "Order placed successfully", order });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to place order", error: err.message });
  }
});

// Get all orders (admin)
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch orders", error: err.message });
  }
});

// Update order status (admin)
app.put("/orders/:id", async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "Order not found" });
    res.json({ success: true, message: "Order updated", updated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update order", error: err.message });
  }
});

// ------------------- START SERVER -------------------
app.listen(port, (error) => {
  if (!error) {
    console.log("🚀 Server Running on Port " + port);
  } else {
    console.log("❌ Server error:", error);
  }
});
