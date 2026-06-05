const Joi = require('joi');

const registerTokenSchema = Joi.object({
  token: Joi.string()
    .trim()
    .required()
    .messages({
      'string.empty': 'Push token cannot be empty',
      'any.required': 'Push token is required',
    }),
});

module.exports = { registerTokenSchema };
