const express = require('express');
const vendorController = require('./vendor.controller');
const auth = require('../../middleware/auth');
const roleCheck = require('../../middleware/roleCheck');

const router = express.Router();

// All vendor routes are protected and require 'vendor' role
router.use(auth);
router.use(roleCheck('vendor'));

router.get('/products', vendorController.getProducts);
router.get('/orders', vendorController.getOrders);
router.get('/stats', vendorController.getStats);

module.exports = router;
