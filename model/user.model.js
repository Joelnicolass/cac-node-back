const database = require("../storage/index");

const userModel = {
  create: (user) => {
    database.users.push(user);
    return true;
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
};

module.exports = userModel;
