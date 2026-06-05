const express = require('express');
const reviewController = require('./review.controller');
const validate = require('../../middleware/validate');
const auth = require('../../middleware/auth');
const { createReviewSchema } = require('./review.validation');

const router = express.Router();

router.get('/product/:productId', reviewController.getByProduct);

router.post(
  '/',
  auth,
  validate(createReviewSchema),
  reviewController.create
);

router.delete('/:id', auth, reviewController.remove);

module.exports = router;
