const productModel = require("../models/product.model");

module.exports = {
  createProduct: async (req, res) => {
    const { name, price, description } = req.body;

    if (!name || !price) {
      res.status(400).json({
        message: "Name and price are required",
      });
      return;
    }

    // getProductByName

    const newProduct = {
      name,
      price,
      description: description || "No description",
    };

    const productCreated = await productModel.create(newProduct);

    if (!productCreated) {
      res.status(500).json({
        message: "Error creating product",
      });
      return;
    }

    res.status(201).json({
      message: "Product created",
    });
  },
};
