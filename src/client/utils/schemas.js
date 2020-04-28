const Joi = require('@hapi/joi').extend(require('joi-phone-number'));

export const requester = Joi.object().keys({
  firstName: Joi.string().max(64).required(),
  lastName: Joi.string().max(64).required(),
  email: Joi.string().max(256).empty('').email(),
  address: Joi.string().max(256).required(),
  phone: Joi.string().phoneNumber({ format: 'e164' }).required(),
  termsAgreement: Joi.boolean().valid(true).required(),
  list: Joi.string().max(1024).required(),
  language: Joi.array().items(
    Joi.string().valid('English', 'Spanish', 'Mandarin', 'Cantonese', 'Other'),
  ),
});

export const volunteer = Joi.object().keys({
  firstName: Joi.string().max(64).required(),
  lastName: Joi.string().max(64).required(),
  email: Joi.string().max(256).email().required(),
  address: Joi.string().max(256).required(),
  phone: Joi.string().phoneNumber({ format: 'e164' }).required(),
  hasCar: Joi.boolean().required(),
  termsAgreement: Joi.boolean().valid(true).required(),
  language: Joi.array().items(
    Joi.string().valid('English', 'Spanish', 'Mandarin', 'Cantonese', 'Other'),
  ),
});
