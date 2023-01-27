const Joi = require('joi');

//validaciones de campos

const id = Joi.string().uuid();
const taskListId = Joi.number().integer(); //Joi.string().alphanum().min(1).max(20); //sin espacios
const userId = Joi.number().integer(); //acepta espacios
const name = Joi.string();
const description = Joi.string();


const createTaskSchema = Joi.object({
  taskListId: taskListId.required(),
  userId: userId.required(),
  name: name.required(),
  description: description.required()
})

const updateTaskSchema = Joi.object({
  taskListId: taskListId,
  userId: userId,
  name: name,
  description: description
})

const getTask = Joi.object({
  id: id.required(),
})

module.exports = { createTaskSchema, updateTaskSchema, getTask }
