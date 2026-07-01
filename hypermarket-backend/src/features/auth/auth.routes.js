const express = require('express');
const authController = require('./auth.controller');
const validate = require('../../middleware/validate');
const auth = require('../../middleware/auth');
const { authLimiter } = require('../../middleware/rateLimiter');
const { registerSchema, loginSchema, updateProfileSchema } = require('./auth.validation');

const router = express.Router();

router.post(
  '/register',
  authLimiter,
  validate(registerSchema),
  authController.register
);

router.post(
  '/login',
  authLimiter,
  validate(loginSchema),
  authController.login
);

router.get('/me', auth, authController.getMe);

router.put(
  '/profile',
  auth,
  validate(updateProfileSchema),
  authController.updateProfile
);

module.exports = router;
