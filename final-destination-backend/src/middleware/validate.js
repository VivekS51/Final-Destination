const { validationResult } = require('express-validator');

/**
 * Express middleware that checks express-validator results.
 * If validation errors exist, responds with 400 and the error array.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = validate;
