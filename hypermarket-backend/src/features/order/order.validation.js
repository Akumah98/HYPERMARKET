const Joi = require('joi');

const createOrderSchema = Joi.object({
  deliveryMethod: Joi.string()
    .valid('home_delivery', 'store_pickup')
    .default('home_delivery'),
  shipping: Joi.object({
    fullName: Joi.string().trim().required(),
    street: Joi.string().trim().allow('').default(''),
    quarter: Joi.string().trim().allow('').default(''),
    city: Joi.string().trim().required(),
    region: Joi.string().trim().allow('').default('Centre'),
    phone: Joi.string().trim().required(),
  }).required(),
  paymentMethod: Joi.string()
    .valid('mtn_momo', 'orange_money')
    .required()
    .messages({ 'any.only': 'Payment method must be mtn_momo or orange_money' }),
});

const updateStatusSchema = Joi.object({
  status: Joi.string()
    .valid('placed', 'processing', 'ready', 'delivered', 'cancelled')
    .required(),
});

module.exports = { createOrderSchema, updateStatusSchema };
