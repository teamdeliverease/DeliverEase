const Joi = require('@hapi/joi').extend(require('joi-phone-number'));

const GENERIC_ERROR_MESSAGE =
  'Whoops! Something went wrong, sorry about that. If this problem continues, please call us at (415) 633-6261';

const validationMiddleware = (schema, property) => {
  return (req, res, next) => {
    try {
      Joi.assert(req[property], schema);
      return next();
    } catch (err) {
      console.error(err);
      return res.status(500).send(GENERIC_ERROR_MESSAGE);
    }
  };
};

module.exports = validationMiddleware;
