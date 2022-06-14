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
  findById: (id) => {
    return database.users.find((user) => user.id === id);
  },
  deleteById: (id) => {
    return (database.users = database.users.filter((user) => user.id !== id));
  },
  updateById: (id, user) => {
    const userToUpdate = database.users.find((user) => user.id === id);
    userToUpdate.name = user.name;
    userToUpdate.password = user.password;
    return userToUpdate;
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
        "products",
        "name price -_id"
      );
      return userWithProducts;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
};

module.exports = userModel;

User.findOneAndUpdate;

/* 
  create read update delete

  post save
  get find
  get findOne
  put findOneAndUpdate
  delete findOneAndDelete

*/
