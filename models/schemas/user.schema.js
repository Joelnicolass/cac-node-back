const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: String,
  password: String,
});

module.exports = model("User", userSchema);
