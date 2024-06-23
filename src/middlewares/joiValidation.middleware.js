const Joi = require('joi');

const validateRequest = (schema, options = {}) => {
  const { key = 'body' } = options;
  return (req, res, next) => {
    const options = {
      abortEarly: false, // include all errors
      allowUnknown: true, // ignore unknown props
      stripUnknown: true // remove unknown props
    };

    // Validate request body, query, and params against the schema
    const { error, value } = schema.validate(
      {body: req[key]},
      options
    );

    if (error) {
      // Validation failed
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      return res.status(400).json({ error: errorMessage });
    }

    // Validation passed, replace req properties with validated values
    req.body = value.body;

    next();
  };
};

module.exports = validateRequest;