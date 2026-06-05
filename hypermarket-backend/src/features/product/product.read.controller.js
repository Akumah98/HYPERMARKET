const queryService = require('./product.query.service');
const { success } = require('../../utils/apiResponse');

const getAll = async (req, res, next) => {
  try {
    const result = await queryService.getProducts(req.query);
    success(res, result);
  } catch (error) {
    next(error);
  }
};

const getBySlug = async (req, res, next) => {
  try {
    const product = await queryService.getProductBySlug(req.params.slug);
    success(res, product);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const product = await queryService.getProductById(req.params.id);
    success(res, product);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getBySlug, getById };
