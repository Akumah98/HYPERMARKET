const Joi = require('joi');

const addItemSchema = Joi.object({
  product: Joi.string().required()
    .messages({ 'string.empty': 'Product ID is required' }),
  quantity: Joi.number().integer().min(1).default(1),
});

const updateItemSchema = Joi.object({
  quantity: Joi.number().integer().min(1).required()
    .messages({ 'number.min': 'Quantity must be at least 1' }),
});

module.exports = { addItemSchema, updateItemSchema };
