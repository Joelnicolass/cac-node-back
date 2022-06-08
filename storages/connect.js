const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/codoacodo", {}).then(() => {
  console.log("Connected to mongo");
});
