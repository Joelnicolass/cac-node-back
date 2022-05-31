const middleTest = (req, res, next) => {
  const email = req.body.email;

  if (!email) {
    res.status(500).json({
      message: "Email is required",
    });

    return;
  }

  next();
};

module.exports = middleTest;
