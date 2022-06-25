const Entity = require("./schemas/crud.schema");

const entityModel = {
  create: async (entity) => {
    try {
      // creo entidad
      const newEntity = new Entity(entity);
      // guardo en mongo a traves de mongoose
      const result = await newEntity.save();
      // retorno resultado al controlador
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getAllEntities: async () => {
    try {
      // obtengo todas las entidades
      const result = await Entity.find();
      // retorno resultado al controlador
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  getEntityById: async (id) => {
    try {
      // obtengo una entidad por su id
      const result = await Entity.findById(id);
      // retorno resultado al controlador
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  updateEntityById: async (id, updatedEntity) => {
    try {
      // actualizo una entidad por su id
      const result = await Entity.findByIdAndUpdate(id, updatedEntity);
      // retorno resultado al controlador
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  updateValueEntityById: async (id, value) => {
    try {
      // actualizo una entidad por su id
      const result = await Entity.findByIdAndUpdate(id, { value });
      // retorno resultado al controlador
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  deleteEntityById: async (id) => {
    try {
      // elimino una entidad por su id
      const result = await Entity.findByIdAndDelete(id);
      // retorno resultado al controlador
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

module.exports = entityModel;
