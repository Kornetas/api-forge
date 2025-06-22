const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

//public route, show all product
router.get("/", getAllProducts);

// only logged in user with admin role can create product
router.post("/", authMiddleware, createProduct);

// only author or admin can update product
router.put("/:id", authMiddleware, updateProduct);

// only author or admin can delete product
router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;
