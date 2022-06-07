const userModel = require("../models/user.model");
const { encrypt, compare, generateToken } = require("../utils");

module.exports = {
  register: async (req, res) => {
    // validar email, password

    const { email, password } = req.body;

    // const name = req.body.name;
    // const password = req.body.password;

    if (!email || !password) {
      res.status(400).json({
        message: "Email and password are required",
      });
      return;
    }

    // consultar si existe el email

    const emailExists = await userModel.getUserByEmail(email);
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
  },
  login: async (req, res) => {
    // validar email, password

    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        message: "Email and password are required",
      });
      return;
    }

    // validar si existe el usuario

    const user = await userModel.getUserByEmail(email);
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
  },
  unregister: async (req, res) => {
    // validar que en el body exista el email
    const { email, id } = req.body;

    if (!email || !id) {
      res.status(400).json({
        message: "Internal error",
      });
      return;
    }

    // validar si existe el usuario

    const user = await userModel.getUserByEmail(email);
    if (!user) {
      res.status(400).json({
        message: "Invalid Email or Password",
      });
      return;
    }

    // eliminar usuario
    const userDeleted = await userModel.deleteById(id);

    if (!userDeleted) {
      res.status(400).json({
        message: "Error deleting user",
      });
      return;
    }

    res.status(200).json(userDeleted);
    return;
  },
};
