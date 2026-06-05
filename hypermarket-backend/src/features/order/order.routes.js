const express = require('express');
const orderController = require('./order.controller');
const validate = require('../../middleware/validate');
const auth = require('../../middleware/auth');
const roleCheck = require('../../middleware/roleCheck');
const {
  createOrderSchema,
  updateStatusSchema,
} = require('./order.validation');

const router = express.Router();

router.use(auth);

router.post('/', validate(createOrderSchema), orderController.create);
router.get('/', orderController.getMyOrders);
router.get('/:id', orderController.getById);
router.put('/:id/cancel', orderController.cancel);

// Vendor / Admin status update
router.put(
  '/:id/status',
  roleCheck('vendor', 'admin'),
  validate(updateStatusSchema),
  orderController.updateStatus
);

module.exports = router;
