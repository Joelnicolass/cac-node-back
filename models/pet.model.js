const Pet = require("../models/schemas/pet.schema");

module.exports = {
  create: async (pet) => {
    try {
      const newPet = await new Pet(pet);
      return await newPet.save();
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  asignUser: async (petId, userId) => {
    try {
      const pet = await Pet.findOneAndUpdate({ _id: petId }, { user: userId });
      return pet;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  getPetById: async (petId) => {
    try {
      const pet = await Pet.findOne({ _id: petId }).populate("user", {
        email: 1,
        _id: 0,
      });
      return pet;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
};
