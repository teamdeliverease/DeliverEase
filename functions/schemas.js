const Joi = require('@hapi/joi').extend(require('joi-phone-number'));

const schemas = {
  requester: Joi.object().keys({
    name: Joi.string()
      .max(64)
      .required(),
    email: Joi.string()
      .max(256)
      .email(),
    address: Joi.string()
      .max(256)
      .required(),
    phone: Joi.string()
      .phoneNumber()
      .required(),
    termsAgreement: Joi.boolean()
      .truthy()
      .required(),
    list: Joi.string()
      .max(1024)
      .required(),
  }),
  volunteer: Joi.object().keys({
    name: Joi.string()
      .max(64)
      .required(),
    email: Joi.string()
      .max(256)
      .email()
      .required(),
    address: Joi.string()
      .max(256)
      .required(),
    phone: Joi.string()
      .phoneNumber()
      .required(),
    termsAgreement: Joi.boolean()
      .truthy()
      .required(),
  }),
};

module.exports = schemas;
