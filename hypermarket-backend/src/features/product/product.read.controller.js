const queryService = require('./product.query.service');
const { success } = require('../../utils/apiResponse');
const cache = require('../../utils/cache');

const getAll = async (req, res, next) => {
  try {
    const cacheKey = `products:list:${JSON.stringify(req.query)}`;
    const cached = await cache.get(cacheKey);
    if (cached) return success(res, cached);

    const result = await queryService.getProducts(req.query);
    await cache.set(cacheKey, result, 300);
    success(res, result);
  } catch (error) {
    next(error);
  }
};

const getBySlug = async (req, res, next) => {
  try {
    const cacheKey = `products:slug:${req.params.slug}`;
    const cached = await cache.get(cacheKey);
    if (cached) return success(res, cached);

    const product = await queryService.getProductBySlug(req.params.slug);
    await cache.set(cacheKey, product, 300);
    success(res, product);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const cacheKey = `products:id:${req.params.id}`;
    const cached = await cache.get(cacheKey);
    if (cached) return success(res, cached);

    const product = await queryService.getProductById(req.params.id);
    await cache.set(cacheKey, product, 300);
    success(res, product);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getBySlug, getById };
