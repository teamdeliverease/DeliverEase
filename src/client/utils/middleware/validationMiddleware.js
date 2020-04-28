import { GENERIC_ERROR_MESSAGE } from '../../constants';

const Joi = require('@hapi/joi').extend(require('joi-phone-number'));

export default (handler, schema) => {
  return (req, res) => {
    try {
      Joi.assert(req.body, schema);
      return handler(req, res);
    } catch (err) {
      console.error(err);
      return res.status(500).send(GENERIC_ERROR_MESSAGE);
    }
  };
};
