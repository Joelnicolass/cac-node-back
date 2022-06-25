const entityModel = require("../models/crud.model");

module.exports = {
  createEntity: async (req, res) => {
    // validaciones
    if (!req.body.name || !req.body.value) {
      res.status(400).json({
        message: "all fields are required",
      });
      return;
    }

    // fin validaciones

    // comunicacion con el modelo para la creacion de una entidad
    const entity = await entityModel.create(req.body);

    //respuesta al cliente
    res.status(201).json({
      message: "Entity created",
    });

    return;
  },
  getAllEntities: async (req, res) => {
    // comunicacion con el modelo para obtener todas las entidades
    const entities = await entityModel.getAllEntities();

    //respuesta al cliente
    res.status(200).json(entities);

    return;
  },
  getEntityById: async (req, res) => {
    //validaciones
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        message: "Id is required",
      });
      return;
    }

    //fin validaciones

    // comunicacion con el modelo para obtener una entidad
    const entity = await entityModel.getEntityById(id);

    if (!entity) {
      res.status(404).json({
        message: "Entity not found",
      });
      return;
    }

    //respuesta al cliente
    res.status(200).json(entity);

    return;
  },
  updateEntityById: async (req, res) => {
    // validaciones
    const { id } = req.params;
    const { name, value } = req.body;

    if (!id || !name || !value) {
      res.status(400).json({
        message: "all fields are required",
      });
      return;
    }

    //fin validaciones

    // construccion de la entidad a actualizar
    const updatedEntity = {
      name,
      value,
    };

    // comunicacion con el modelo para actualizar una entidad

    const entity = await entityModel.updateEntityById(id, updatedEntity);

    if (!entity) {
      res.status(404).json({
        message: "Entity not found",
      });
      return;
    }

    //respuesta al cliente
    res.status(200).json(entity);

    return;
  },
  deleteEntityById: async (req, res) => {
    // validaciones
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        message: "Id is required",
      });
      return;
    }

    //fin validaciones

    // comunicacion con el modelo para eliminar una entidad
    const entity = await entityModel.deleteEntityById(id);

    if (!entity) {
      res.status(404).json({
        message: "Entity not found",
      });
      return;
    }

    //respuesta al cliente
    res.status(200).json(entity);

    return;
  },
  updateValueEntityById: async (req, res) => {
    // validaciones
    const { id } = req.params;
    const { value } = req.body;

    if (!id || !value) {
      res.status(400).json({
        message: "all fields are required",
      });
      return;
    }

    //fin validaciones

    // comunicacion con el modelo para actualizar una entidad

    const entity = await entityModel.updateValueEntityById(id, value);

    if (!entity) {
      res.status(404).json({
        message: "Entity not found",
      });
      return;
    }

    //respuesta al cliente
    res.status(200).json(entity);

    return;
  },
};
