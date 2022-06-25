const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const entitySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: String,
    required: true,
  },
});

module.exports = model("Entity", entitySchema);
