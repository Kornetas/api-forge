const Product = require("../models/Product");

//get api products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Błąd serwera" });
  }
};

//post api products
exports.createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const product = new Product({ name, price });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: "Nie udało się dodać produktu" });
  }
};
