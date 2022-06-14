const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  getUserByIdWithProducts,
} = require("./../controllers/user.controller");

router.get("/", getAllUsers);
router.get("/:id", getUserById);

router.get("/:id/products", getUserByIdWithProducts);

module.exports = router;
