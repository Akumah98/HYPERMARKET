const Joi = require('joi');

const createCategorySchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required()
    .messages({ 'string.empty': 'Category name is required' }),
  description: Joi.string().trim().max(500).allow('').default(''),
  image: Joi.string().uri().allow('').default(''),
});

const updateCategorySchema = Joi.object({
  name: Joi.string().trim().min(2).max(100),
  description: Joi.string().trim().max(500).allow(''),
  image: Joi.string().uri().allow(''),
  isActive: Joi.boolean(),
}).min(1);

module.exports = { createCategorySchema, updateCategorySchema };
