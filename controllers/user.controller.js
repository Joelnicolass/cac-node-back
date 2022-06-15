const userModel = require("../models/user.model");
const fs = require("fs");

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
  postImage: async (req, res) => {
    if (!req.file) {
      res.status(400).json({
        message: "Image is required",
      });
      return;
    }

    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        message: "Id is required",
      });
      return;
    }

    const user = await userModel.findById(id);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    // image to base64
    let file = fs.readFileSync(req.file.path);
    let encode = file.toString("base64");

    const saveImage = await userModel.postImage(id, encode);

    if (!saveImage) {
      res.status(400).json({
        message: "Image not saved",
      });
      return;
    }

    res.status(200).json({
      message: "Image uploaded",
    });
  },
  getImage: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        message: "Id is required",
      });
      return;
    }

    const user = await userModel.findById(id);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    const image = user.image;

    if (!image) {
      res.status(404).json({
        message: "Image not found",
      });
      return;
    }

    res.status(200).send(image);
  },
};
