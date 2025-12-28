// src/app.ts
import express from "express";
import productRoutes from "./routes/product";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/products", productRoutes);

// Route test đơn giản
app.get("/", (req, res) => {
  res.send("🚀 API server is running!");
});

export default app;
