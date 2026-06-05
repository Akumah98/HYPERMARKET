const Joi = require('joi');

const createProductSchema = Joi.object({
  name: Joi.string().trim().min(2).max(200).required(),
  description: Joi.string().trim().max(2000).allow('').default(''),
  price: Joi.number().min(0).required(),
  compareAtPrice: Joi.number().min(0).default(0),
  category: Joi.string().required(),
  stock: Joi.number().integer().min(0).required(),
  unit: Joi.string()
    .valid('kg', 'g', 'L', 'mL', 'piece', 'bundle', 'pack', 'bag')
    .default('piece'),
  weight: Joi.string().trim().allow('').default(''),
  tags: Joi.array().items(Joi.string().trim()).default([]),
  badges: Joi.array().items(Joi.string().trim()).default([]),
});

const updateProductSchema = Joi.object({
  name: Joi.string().trim().min(2).max(200),
  description: Joi.string().trim().max(2000).allow(''),
  price: Joi.number().min(0),
  compareAtPrice: Joi.number().min(0),
  category: Joi.string(),
  stock: Joi.number().integer().min(0),
  unit: Joi.string()
    .valid('kg', 'g', 'L', 'mL', 'piece', 'bundle', 'pack', 'bag'),
  weight: Joi.string().trim().allow(''),
  tags: Joi.array().items(Joi.string().trim()),
  badges: Joi.array().items(Joi.string().trim()),
  isActive: Joi.boolean(),
}).min(1);

const queryProductSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(50).default(12),
  category: Joi.string().allow(''),
  vendor: Joi.string().allow(''),
  search: Joi.string().trim().allow(''),
  minPrice: Joi.number().min(0),
  maxPrice: Joi.number().min(0),
  sort: Joi.string()
    .valid('price_asc', 'price_desc', 'newest', 'rating', 'name')
    .default('newest'),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  queryProductSchema,
};
