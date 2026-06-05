const express = require('express');
const paymentController = require('./payment.controller');
const validate = require('../../middleware/validate');
const auth = require('../../middleware/auth');
const {
  initiatePaymentSchema,
  statusQuerySchema,
  webhookSchema,
} = require('./payment.validation');

const router = express.Router();

// Webhook endpoint (public - Fapshi callbacks)
router.post(
  '/webhook',
  validate(webhookSchema),
  paymentController.handleWebhook
);

// Protected endpoints below
router.use(auth);

router.post(
  '/initiate',
  validate(initiatePaymentSchema),
  paymentController.initiate
);

router.get(
  '/status/:transId',
  validate(statusQuerySchema, 'params'),
  paymentController.getStatus
);

module.exports = router;
