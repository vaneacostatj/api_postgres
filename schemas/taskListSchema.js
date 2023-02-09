const Joi = require('joi');

const id = Joi.string();
const name = Joi.string();


const createTaskListSchema = Joi.object({
  name: name.required()
})

const updateTaskListSchema = Joi.object({
  name: name,
})

const getTaskList = Joi.object({
  id: id.required(),
})

module.exports = { createTaskListSchema, updateTaskListSchema, getTaskList }
