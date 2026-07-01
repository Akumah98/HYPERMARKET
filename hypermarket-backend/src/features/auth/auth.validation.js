const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required()
    .messages({ 'string.empty': 'Name is required' }),
  email: Joi.string().email().lowercase().trim().required()
    .messages({ 'string.email': 'Please provide a valid email' }),
  password: Joi.string().min(6).max(128).required()
    .messages({ 'string.min': 'Password must be at least 6 characters' }),
  role: Joi.string().valid('customer', 'vendor').default('customer'),
  phone: Joi.string().trim().allow('').default(''),
});

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required()
    .messages({ 'string.email': 'Please provide a valid email' }),
  password: Joi.string().required()
    .messages({ 'string.empty': 'Password is required' }),
});

const updateProfileSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100),
  phone: Joi.string().trim().allow(''),
  address: Joi.object({
    street: Joi.string().trim().allow(''),
    quarter: Joi.string().trim().allow(''),
    city: Joi.string().trim().allow(''),
    region: Joi.string().trim().allow(''),
  }),
  billing: Joi.object({
    paymentMethod: Joi.string().valid('mtn_momo', 'orange_money', '').default(''),
    phone: Joi.string().trim().allow(''),
  }),
});

module.exports = { registerSchema, loginSchema, updateProfileSchema };
