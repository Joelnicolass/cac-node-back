const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  encrypt: async (data) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(data, salt);
  },
  compare: async (data, encrypted) => {
    return await bcrypt.compare(data, encrypted);
  },
  tokenValidator: (req, res, next) => {
    const token = req.headers["auth"];

    if (!token) {
      res.status(401).json({
        msg: "No token provided",
      });

      return;
    }

    try {
      const verified = jwt.verify(token, "SECRET");
    } catch (error) {
      res.status(401).json({
        msg: "Invalid token",
      });
      return;
    }
    next();
  },
};

//  bcrypt.genSalt(10)
//  bcrypt.hash("password", salt)
//  bcrypt.compare("password", hash)

// token = req.headers["auth"];
// jwt.verify(token, "SECRET")
