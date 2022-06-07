const router = require("express").Router();
const petModel = require("../models/pet.model");

router.post("/add", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({
      message: "Name is required",
    });
    return;
  }

  const newPet = await petModel.create({
    name,
  });

  res.status(201).json({
    message: "Pet created",
    pet: newPet,
  });
  return;
});

router.put("/asign", async (req, res) => {
  const { petId, userId } = req.body;

  if (!petId || !userId) {
    res.status(400).json({
      message: "Id and userId are required",
    });
    return;
  }

  const pet = await petModel.asignUser(petId, userId);

  res.status(200).json({
    message: "Pet asigned",
    pet,
  });
  return;
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      message: "Id is required",
    });
    return;
  }

  const pet = await petModel.getPetById(id);

  res.status(200).json(pet);
  return;
});

module.exports = router;
