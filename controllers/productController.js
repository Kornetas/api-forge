const Product = require("../models/Product");

//get api products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

//create new product (only for admin)
exports.createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const product = new Product({
      name,
      price,
      createdBy: req.user.id,
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(400).json({ message: "failed to create product" });
  }
};

//update product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "product not found" });

    // only admin or owner
    if (
      product.createdBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized to update" });
    }

    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: "fail to update product" });
  }
};

// delete produuct
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // only admin or owner
    if (
      product.createdBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "not authorized to delete" });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(400).json({ message: "failed to delete product" });
  }
};
