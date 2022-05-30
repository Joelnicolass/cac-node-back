const router = require("express").Router();

router.get("/", (req, res) => {
  // router code here
  res.send("Hello from user router");
});

router.get("/another-route", (req, res) => {
  // router code here
});

module.exports = router;
