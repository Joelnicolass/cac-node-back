const router = require("express").Router();

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  getAllUsers,
  getUserById,
  getUserByIdWithProducts,
  postImage,
  getImage,
} = require("./../controllers/user.controller");

router.get("/", getAllUsers);
router.get("/:id", getUserById);

router.get("/products/:id", getUserByIdWithProducts);

router.post("/image/:id", upload.single("avatar"), postImage);
router.get("/image/:id", getImage);

module.exports = router;
