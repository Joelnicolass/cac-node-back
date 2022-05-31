const express = require("express");
const cors = require("cors");
const userModel = require("./model/user.model");
const middleTest = require("./middleware/index");
const { tokenValidator, compare, encrypt } = require("./utils");
const jwt = require("jsonwebtoken");

const app = express();
const port = 5000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/register", async (req, res) => {
  // const email = req.body.email;
  // const password = req.body.password;
  const { email, password } = req.body;

  // validaciones
  if (!email || !password) {
    res.status(500).json({
      message: "Email and password are required",
    });

    return;
  }

  const existEmail = userModel.getUserByEmail(email);

  if (existEmail) {
    res.status(500).json({
      message: "Email already exist",
    });

    return;
  }

  const encrypted = await encrypt(password);
  console.log(encrypted);

  const newUser = {
    id: Date.now(),
    email,
    password: encrypted,
  };

  userModel.create(newUser);

  res.status(201).json({
    msg: "ok",
  });

  return;
});

app.post("/login", async (req, res) => {
  // const token = jwt.sign({user}, 'SECRET');
});

app.get("/users", tokenValidator, (req, res) => {
  const users = userModel.getAllUsers();

  res.status(200).json(users);
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = userModel.findById(id);
  res.status(200).json(user);
});

app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);
