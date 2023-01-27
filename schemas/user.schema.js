const Joi = require('joi');

const id = Joi.string().uuid();
const firstName = Joi.string(); //Joi.string().uuid();
const lastName = Joi.string();
const email = Joi.string().email()
//const avatar = Joi.string().uri();


const createUserSchema = Joi.object({
  firstName : firstName.required(),
  lastName : lastName.required(),
  email : email.required(),
  //avatar : avatar.required()
})

const updateUserSchema = Joi.object({
  firstName : firstName,
  lastName : lastName,
  email : email,
  //avatar : avatar
})

const getUserSchema = Joi.object({
  id: id.required(),
})

module.exports = { createUserSchema, updateUserSchema, getUserSchema }
