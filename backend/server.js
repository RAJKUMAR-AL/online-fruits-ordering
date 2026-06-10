// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, "../frontend")));

// ---------- MONGODB CONNECTION ----------
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/fruit_store";

const itemSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  delivery: String,
  cartItems: [{ name: String, price: Number, qty: Number }],
  grandTotal: Number,
  createdAt: { type: Date, default: Date.now },
});

const Item = mongoose.model("Item", itemSchema, "items");

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// ---------- ROUTES ----------

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/r1.html"));
});

app.get("/api", (_req, res) => {
  res.send("API Working ✔️");
});

app.post("/place-order", async (req, res) => {
  console.log("📥 Received order:", req.body);
  try {
    const item = new Item(req.body);
    await item.save();
    console.log("✅ Order saved to MongoDB");
    res.json({ success: true, message: "Order stored in MongoDB" });
  } catch (err) {
    console.error("❌ Error saving order:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ---------- START SERVER ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

module.exports = app;
