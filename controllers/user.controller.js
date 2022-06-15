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

    if (!id) {
      res.status(400).json({
        message: "Id is required",
      });
      return;
    }

    const userWithProducts = await userModel.getUserByIdWithProducts(id);

    if (!userWithProducts) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    res.status(200).json(userWithProducts);
  },
};
