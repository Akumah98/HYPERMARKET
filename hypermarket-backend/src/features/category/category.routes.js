const express = require('express');
const categoryController = require('./category.controller');
const validate = require('../../middleware/validate');
const auth = require('../../middleware/auth');
const roleCheck = require('../../middleware/roleCheck');
const {
  createCategorySchema,
  updateCategorySchema,
} = require('./category.validation');

const router = express.Router();

router.get('/', categoryController.getAll);
router.get('/:slug', categoryController.getBySlug);

// Admin only
router.post(
  '/',
  auth,
  roleCheck('admin'),
  validate(createCategorySchema),
  categoryController.create
);

router.put(
  '/:id',
  auth,
  roleCheck('admin'),
  validate(updateCategorySchema),
  categoryController.update
);

router.delete(
  '/:id',
  auth,
  roleCheck('admin'),
  categoryController.remove
);

module.exports = router;
