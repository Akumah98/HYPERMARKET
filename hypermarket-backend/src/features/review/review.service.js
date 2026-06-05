const Review = require('./review.model');
const Product = require('../product/product.model');
const AppError = require('../../utils/apiError');

const updateProductRating = async (productId) => {
  const stats = await Review.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: '$product',
        averageRating: { $avg: '$rating' },
        reviewCount: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      averageRating: Math.round(stats[0].averageRating * 10) / 10,
      reviewCount: stats[0].reviewCount,
    });
  }
};

const createReview = async (data, userId) => {
  const existing = await Review.findOne({
    product: data.product,
    user: userId,
  });

  if (existing) {
    throw new AppError('You already reviewed this product', 409);
  }

  const review = await Review.create({ ...data, user: userId });
  await updateProductRating(review.product);

  return review.populate('user', 'name');
};

const getProductReviews = async (productId) => {
  return Review.find({ product: productId })
    .populate('user', 'name')
    .sort({ createdAt: -1 });
};

const deleteReview = async (reviewId, userId) => {
  const review = await Review.findById(reviewId);
  if (!review) throw new AppError('Review not found', 404);

  if (review.user.toString() !== userId) {
    throw new AppError('You can only delete your own reviews', 403);
  }

  const productId = review.product;
  await Review.findByIdAndDelete(reviewId);
  await updateProductRating(productId);

  return review;
};

module.exports = { createReview, getProductReviews, deleteReview };
