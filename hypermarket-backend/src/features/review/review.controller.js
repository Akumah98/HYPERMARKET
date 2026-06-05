const reviewService = require('./review.service');
const { success } = require('../../utils/apiResponse');

const create = async (req, res, next) => {
  try {
    const review = await reviewService.createReview(req.body, req.user.id);
    success(res, review, 201);
  } catch (error) {
    next(error);
  }
};

const getByProduct = async (req, res, next) => {
  try {
    const reviews = await reviewService.getProductReviews(req.params.productId);
    success(res, reviews);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await reviewService.deleteReview(req.params.id, req.user.id);
    success(res, { message: 'Review deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { create, getByProduct, remove };
