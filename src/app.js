// src/app.js

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler.middleware');
const morganLogger = require('./middlewares/morganLogger.middleware');
const { baseRouter } = require('./routes');
const routingModulesConstants = require('./constants/routingModules.constant');

// enables express to handle async errors in middlewares
require('express-async-errors');

const app = express();

// Security middlewares
app.use(helmet());
app.use(cors());

// body parser middleware
app.use(express.json());

// Middlewares
app.use(morganLogger);

// Routes
app.get('/api', async (req, res) => {
  return res.send("Hello from server!")
})
app.use(`/${routingModulesConstants.API}`, baseRouter);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
