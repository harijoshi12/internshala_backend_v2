// src/routes/userRoutes.js

const express = require('express');
const { registerUser, loginUser } = require('../controllers/auth.controller');
const validateRequest = require('../middlewares/joiValidation.middleware');
const { registerUserSchema, loginSchema } = require('../validations/auth.validation');

const router = express.Router();

// Register route
router.post('/register', validateRequest(registerUserSchema) ,registerUser);

// Login route
router.post('/login', validateRequest(loginSchema) ,loginUser);

module.exports = {authRouter: router};
