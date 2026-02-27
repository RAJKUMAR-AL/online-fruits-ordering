// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// ---------- MONGODB CONNECTION ----------

const MONGO_URI = "mongodb://localhost:27017/fruit_store";
// This matches what you see in Compass: localhost:27017, DB: fruit_store

// Define schema & model here (collection: items)
const itemSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  delivery: String,
  cartItems: [
    {
      name: String,
      price: Number,
      qty: Number
    }
  ],
  grandTotal: Number,
  createdAt: { type: Date, default: Date.now },
});


// 3rd argument "items" forces collection name to be exactly "items"
const Item = mongoose.model("Item", itemSchema, "items");

// Connect to Mongo and start server ONLY after successful connection
mongoose.connect(MONGO_URI)

  .then(() => {
    console.log("✅ Connected to MongoDB: fruit_store");

    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1); // stop app if DB connection fails
  });

// ---------- ROUTES ----------

// Serve the main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/r1.html"));
});

// Test route
app.get("/api", (req, res) => {
  res.send("API Working ✔️");
});

// Save order route
app.post("/place-order", async (req, res) => {
  console.log("📥 Received order:", req.body);
  try {
    const item = new Item(req.body);   // uses items collection
    await item.save();
    console.log("✅ Order saved into MongoDB (items)");
    res.json({ success: true, message: "Order stored in MongoDB" });
  } catch (err) {
    console.error("❌ Error saving order:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});
