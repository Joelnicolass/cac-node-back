const userModel = require("../models/user.model");

module.exports = {
  getAllUsers: async (req, res) => {
    const users = await userModel.getAllUsers();
    res.status(200).json({
      message: "Users",
      users,
    });
    return;
  },
  getUserById: async (req, res) => {
    const { id } = req.params;
    const user = userModel.getUserById(id);
    res.status(200).json({
      message: "User",
      user,
    });
    return;
  },
};
