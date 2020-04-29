import { GENERIC_ERROR_MESSAGE } from '../../constants';

const Joi = require('@hapi/joi').extend(require('joi-phone-number'));

export default (req, res, schema) => {
  try {
    return Joi.assert(req.body, schema);
  } catch (err) {
    console.error(new Error(err.message));
    res.status(500);
    throw new Error(GENERIC_ERROR_MESSAGE);
  }
};
