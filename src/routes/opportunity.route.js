// src/routes/opportunityRoutes.js

const express = require('express');
const { getOpportunities, applyOpportunity } = require('../controllers/opportunity.controller');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

// Get all opportunities
router.get('/', auth(), getOpportunities);

// apply opportunity
router.post('/apply/:opportunityId', auth() , applyOpportunity);

module.exports = {opportunityRouter : router};
