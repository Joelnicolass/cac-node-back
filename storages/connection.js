const mongoose = require("mongoose");

// Conexion con la db de mongo

mongoose.connect("mongodb://localhost/cac", {}).then(() => {
  console.log("Connected to database");
});
