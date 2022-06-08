const express = require("express");
const cors = require("cors");
const middlewareTest = require("./middlewares/index");
const { tokenValidator, generateToken, encrypt, compare } = require("./utils");
const userModel = require("./models/user.model");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const app = express();
const port = 5000;

require("./storages/connect");

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRoutes);
app.use("/user", tokenValidator, userRoutes);

app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);
