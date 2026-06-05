const express = require('express');
const adminController = require('./admin.controller');
const auth = require('../../middleware/auth');
const roleCheck = require('../../middleware/roleCheck');

const router = express.Router();

// All admin routes are protected and require 'admin' role
router.use(auth);
router.use(roleCheck('admin'));

router.get('/users', adminController.getUsers);
router.get('/orders', adminController.getOrders);
router.get('/stats', adminController.getStats);

module.exports = router;
