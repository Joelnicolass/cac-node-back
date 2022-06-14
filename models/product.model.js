const Product = require("./schemas/product.schema");

const productModel = {
  create: async (product) => {
    try {
      const newProduct = new Product(product);
      return await newProduct.save();
    } catch (error) {
      console.log(error);
    }
    return null;
  },
};

module.exports = productModel;
