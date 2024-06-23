// src/validations/userValidation.js

const Joi = require('joi');

const registerUserSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    fullName: Joi.string().min(2).max(50).required(),
    phoneNumber: Joi.string().pattern(/^[0-9]+$/).min(10).max(15).optional(),
    password: Joi.string().min(6).required(),
  })
});

const loginSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  })
});

module.exports = {
  registerUserSchema,
  loginSchema
};
