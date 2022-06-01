const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  encrypt: async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  },
  compare: async (password, encrypted) => {
    return await bcrypt.compare(password, encrypted);
  },
  tokenValidator: (req, res, next) => {
    const token = req.headers["auth"];

    if (!token) {
      res.status(401).json({
        message: "Access denied",
      });
      return;
    }

    try {
      const verified = jwt.verify(token, "SECRET");
    } catch (error) {
      res.status(401).json({
        message: "Error",
      });
      return;
    }

    next();
  },
  generateToken: async (data = {}) => {
    return await jwt.sign({ data }, "SECRET");
  },
};

//  bcrypt.genSalt(10)
//  bcrypt.hash("password", salt)
//  bcrypt.compare("password", hash)

// token = req.headers["auth"];
// jwt.verify(token, "SECRET")
// jwt.sign({user}, 'SECRET')
