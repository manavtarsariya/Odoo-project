// server.js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

// DB connection
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});