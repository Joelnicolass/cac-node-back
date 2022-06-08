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
  getAllUsers: () => {
    const users = database.users;
    return users;
  },
  getUserByEmail: async (email) => {
    try {
      const user = await User.findOne({ email });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = userModel;
