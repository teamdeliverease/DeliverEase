const Joi = require('@hapi/joi').extend(require('joi-phone-number'));
const validationMiddleware = (schema, property) => {
  return (req, res, next) => {
    try {
      Joi.assert(req[property], schema);
      return next();
    } catch (err) {
      console.error(err);
      return res.status(400).json({ err });
    }
  };
};

module.exports = validationMiddleware;
