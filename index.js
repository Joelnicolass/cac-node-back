const express = require("express");
const cors = require("cors");
const middlewareTest = require("./middlewares/index");
const { tokenValidator, generateToken, encrypt } = require("./utils");
const userModel = require("./models/user.model");
const { compare } = require("bcrypt");

const app = express();
const port = 5000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/register", async (req, res) => {
  // validar email, password

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      message: "Email and password are required",
    });
    return;
  }

  // consultar si existe el email

  const emailExists = userModel.getUserByEmail(email);
  if (emailExists) {
    res.status(400).json({
      message: "Email already exists",
    });
    return;
  }

  // encriptar password

  const passEncrypted = await encrypt(password);

  // crear un usuario
  const newUser = {
    id: Date.now(),
    email,
    password: passEncrypted,
  };

  // guardar en la base de datos

  const userCreated = userModel.create(newUser);

  res.status(201).json({
    message: "User created",
  });
  return;
});

app.post("/login", async (req, res) => {
  // validar email, password

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      message: "Email and password are required",
    });
    return;
  }

  // validar si existe el usuario

  const user = userModel.getUserByEmail(email);
  if (!user) {
    res.status(400).json({
      message: "Invalid Email or Password",
    });
    return;
  }

  // comparar password

  const passIsValid = await compare(password, user.password);

  if (!passIsValid) {
    res.status(400).json({
      message: "Invalid Email or Password",
    });
    return;
  }

  // validar usuario

  if (email !== user.email) {
    res.status(400).json({
      message: "Invalid Email or Password",
    });
    return;
  }

  // crear token
  const token = await generateToken({
    id: user.id,
    email: user.email,
  });

  // enviar datos

  res.status(200).json({
    message: "Login Successful",
    token,
  });
  return;
});

app.get("/users", tokenValidator, (req, res) => {
  const users = userModel.getAllUsers();
  res.status(200).json({
    message: "Users",
    users,
  });
  return;
});

//app.get("/users/:id");

app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);
