const { createProduct } = require("../controllers/product.controller");

const router = require("express").Router();

router.post("/", createProduct);

module.exports = router;
