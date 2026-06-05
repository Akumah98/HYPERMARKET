const express = require('express');
const readController = require('./product.read.controller');
const writeController = require('./product.write.controller');
const validate = require('../../middleware/validate');
const auth = require('../../middleware/auth');
const roleCheck = require('../../middleware/roleCheck');
const { upload } = require('../../config/cloudinary');
const {
  createProductSchema,
  updateProductSchema,
  queryProductSchema,
} = require('./product.validation');

const router = express.Router();

// Public routes
router.get('/', validate(queryProductSchema, 'query'), readController.getAll);
router.get('/slug/:slug', readController.getBySlug);

// Vendor routes (must come before /:id)
router.get(
  '/vendor/me',
  auth,
  roleCheck('vendor'),
  writeController.getMyProducts
);

router.get('/:id', readController.getById);

// Vendor write routes
router.post(
  '/',
  auth,
  roleCheck('vendor', 'admin'),
  validate(createProductSchema),
  writeController.create
);

router.put(
  '/:id',
  auth,
  roleCheck('vendor', 'admin'),
  validate(updateProductSchema),
  writeController.update
);

router.delete(
  '/:id',
  auth,
  roleCheck('vendor', 'admin'),
  writeController.remove
);

router.post(
  '/:id/images',
  auth,
  roleCheck('vendor', 'admin'),
  upload.array('images', 5),
  writeController.uploadImages
);

module.exports = router;
