const middlewareTest = (req, res, next) => {
  const email = req.body.email;

  if (!email) {
    res.status(400).send({
      message: "Email is required",
    });
    return;
  }

  next();
};

module.exports = middlewareTest;
