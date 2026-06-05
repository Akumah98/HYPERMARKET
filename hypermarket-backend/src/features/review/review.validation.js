const Joi = require('joi');

const createReviewSchema = Joi.object({
  product: Joi.string().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().trim().max(1000).allow('').default(''),
});

module.exports = { createReviewSchema };
