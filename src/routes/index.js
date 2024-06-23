// src/routes/opportunityRoutes.js

const express = require('express');
const routingModules = require('../constants/routingModules.constant');
const { opportunityRouter } = require('./opportunity.route');
const { authRouter } = require('./auth.route');

const router = express.Router();

router.use(`/${routingModules.AUTH}`, authRouter);

router.use(`/${routingModules.OPPORTUNITIES}`, opportunityRouter);

module.exports = {baseRouter : router};
