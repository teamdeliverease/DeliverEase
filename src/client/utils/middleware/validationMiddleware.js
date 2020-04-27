import { GENERIC_ERROR_MESSAGE } from '../../constants';

const Joi = require('@hapi/joi').extend(require('joi-phone-number'));

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
