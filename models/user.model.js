const database = require("../storages/index");
const User = require("./schemas/user.schema");

const userModel = {
  create: async (user) => {
    try {
      const newUser = new User(user);
      return await newUser.save();
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  findById: async (id) => {
    try {
      return await User.findById(id);
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  deleteById: async (id) => {
    try {
      return await User.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  updateById: async (id, user) => {
    try {
      return await User.findByIdAndUpdate(id, user);
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  getAllUsers: async () => {
    try {
      return await User.find();
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  getUserByEmail: async (email) => {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  getUserByIdWithProducts: async (id) => {
    try {
      const userWithProducts = await User.findOne({ _id: id }).populate(
        "products"
      );
      return userWithProducts;
    } catch (error) {
      console.log(error);
    }
  },
  postImage: async (id, image) => {
    try {
      const user = await User.findByIdAndUpdate(id, { image });
      return user;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
};

module.exports = userModel;

/* 
  create read update delete

  post save
  get find
  get findOne
  put patch findOneAndUpdate
  delete findOneAndDelete

*/
