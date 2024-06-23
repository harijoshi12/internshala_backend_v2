// src/validations/opportunityValidation.js

const Joi = require('joi');

const getOpportunitiesSchema = Joi.object({
  searchString: Joi.string().trim().allow(''),
  sortBy: Joi.string().valid('companyName', 'profile', 'stipend', 'location', 'duration', 'startDate').default('createdAt'),
  sortOrder: Joi.string().valid('asc', 'desc').default('desc'),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  isApplied: Joi.boolean().default(false)
});

module.exports = {
  getOpportunitiesSchema,
};
