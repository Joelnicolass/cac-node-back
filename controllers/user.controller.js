const userModel = require("../models/user.model");

module.exports = {
  getAllUsers: async (req, res) => {
    const users = await userModel.getAllUsers();
    res.status(200).json({
      message: "Users retrieved",
      users,
    });
  },
  getUserById: async (req, res) => {
    const { id } = req.params;
    const user = await userModel.getUserById(id);
    res.status(200).json({
      message: "User",
      user,
    });
    return;
  },
  getUserByIdWithProducts: async (req, res) => {
    const { id } = req.params;
    const userWithProducts = await userModel.getUserByIdWithProducts(id);
    res.status(200).json({
      message: "User with products",
      userWithProducts,
    });
    return;
  },
};
