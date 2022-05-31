const express = require("express");
const cors = require("cors");
const userModel = require("./model/user.model");
const { compare, encrypt, tokenValidator } = require("./utils/index");
const jwt = require("jsonwebtoken");

const app = express();
const port = 5000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({
      msg: "Email and password are required",
    });

    return;
  }

  const user = userModel.getUserByEmail(req.body.email);

  if (!user) {
    res.status(400).json({
      msg: "User not found",
    });

    return;
  }

  const isPasswordValid = await compare(req.body.password, user.password);

  if (!isPasswordValid) {
    res.status(400).json({
      msg: "Invalid password",
    });

    return;
  }

  const token = jwt.sign(
    { id: user.id, msg: "hola, soy un mensaje oculto en jwt" },
    "SECRET"
  );

  res.status(200).json({
    token,
  });

  return;
});

app.post("/register", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({
      message: "Missing required fields",
    });

    return;
  }

  const userExist = userModel.getUserByEmail(req.body.email);

  if (userExist) {
    res.status(400).json({
      message: "User already exist",
    });

    return;
  }

  const newUser = {
    id: Date.now(),
    email: req.body.email,
    password: await encrypt(req.body.password),
  };

  const user = userModel.create(newUser);

  if (user) {
    res.status(200).json({
      message: "User created",
    });

    return;
  } else {
    res.status(400).json({
      message: "User not created",
    });

    return;
  }
});

app.get("/users", tokenValidator, (req, res) => {
  const users = userModel.getAllUsers();

  res.status(200).json({
    users,
  });

  return;
});

app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);
