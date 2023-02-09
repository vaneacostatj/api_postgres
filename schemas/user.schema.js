const Joi = require('joi');

const id = Joi.string(); //Joi.string().uuid();
const firstName = Joi.string();
const lastName = Joi.string();
const email = Joi.string().email()
const password = Joi.string().min(8)
//const avatar = Joi.string().uri();


const createUserSchema = Joi.object({
  firstName : firstName.required(),
  lastName : lastName.required(),
  email : email.required(),
  password : password.required(),
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
