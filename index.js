const express = require("express");
const cors = require("cors");
const userModel = require("./model/user.model");

const app = express();
const port = 5000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/user", (req, res) => {
  const user = req.body;

  const newUser = userModel.create(user);

  if (newUser) {
    res.status(200).json({
      message: "User created",
    });
  }
});

app.get("/user", (req, res) => {
  const users = userModel.getAllUsers();

  res.status(200).json(users);
});

app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);
