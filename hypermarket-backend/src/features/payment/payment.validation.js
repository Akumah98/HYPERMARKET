const Joi = require('joi');

const initiatePaymentSchema = Joi.object({
  orderId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid Order ID format',
      'any.required': 'Order ID is required',
    }),
  phone: Joi.string()
    .regex(/^6[\d]{8}$/)
    .required()
    .messages({
      'string.pattern.base': 'Phone number must be a valid Cameroon number starting with 6 (9 digits)',
      'any.required': 'Phone number is required',
    }),
});

const statusQuerySchema = Joi.object({
  transId: Joi.string()
    .regex(/^[a-zA-Z0-9]{8,10}$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid transaction ID format',
    }),
});

const webhookSchema = Joi.object({
  transId: Joi.string()
    .regex(/^[a-zA-Z0-9]{8,10}$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid transaction ID format',
    }),
});

module.exports = {
  initiatePaymentSchema,
  statusQuerySchema,
  webhookSchema,
};
