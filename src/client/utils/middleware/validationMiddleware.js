import { GENERIC_ERROR_MESSAGE } from '../../constants';

const Joi = require('@hapi/joi').extend(require('joi-phone-number'));

export default (req, res, schema) => {
  try {
    return Joi.assert(req.body, schema);
  } catch (err) {
    console.error(err);
    return res.status(500).send(GENERIC_ERROR_MESSAGE);
  }
};
