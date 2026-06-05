const express = require('express');
const notificationController = require('./notification.controller');
const validate = require('../../middleware/validate');
const auth = require('../../middleware/auth');
const { registerTokenSchema } = require('./notification.validation');

const router = express.Router();

// Require authentication for token registration
router.post(
  '/register',
  auth,
  validate(registerTokenSchema),
  notificationController.register
);

module.exports = router;
