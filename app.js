const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// middleware to parse JSON body
app.use(express.json());

// main routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

//export app (used in tests)
module.exports = app;
