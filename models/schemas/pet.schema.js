const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const petSchema = new Schema({
  name: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = model("Pet", petSchema);
