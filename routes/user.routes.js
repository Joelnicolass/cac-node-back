const router = require("express").Router();
const { unregister } = require("../controllers/auth.controller");
const {
  getAllUsers,
  getUserById,
} = require("./../controllers/user.controller");

router.get("/", getAllUsers);
router.put("/:id", getUserById);
router.post("/unregister", unregister);

module.exports = router;
