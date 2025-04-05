const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
