const express = require("express");
const userModel = require("./model/user.model");
const cors = require("cors");

const app = express();
const port = 5000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.get("/user", (req, res) => {
  const users = userModel.getAllUsers();

  res.status(200).json(users);
  return;
});

app.post("/user", (req, res) => {
  /* const name = req.body.name;
  const password = req.body.password; */

  const user = req.body;

  const newUser = userModel.create(user);

  if (newUser) {
    res.status(201).json({
      name: user.name,
    });
    return;
  } else {
    res.status(500).json({
      message: "Error while creating user",
    });
    return;
  }
});

app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);
