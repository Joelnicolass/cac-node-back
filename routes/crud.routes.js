const {
  getAllEntities,
  getEntityById,
  createEntity,
  deleteEntityById,
  updateEntityById,
  updateValueEntityById,
} = require("../controllers/crud.controller");

const router = require("express").Router();

router.get("/", getAllEntities);

router.get("/:id", getEntityById);

router.post("/add", createEntity);

router.delete("/:id", deleteEntityById);

router.put("/:id", updateEntityById);

router.patch("/:id", updateValueEntityById);

module.exports = router;
