const express = require('express');
const cartController = require('./cart.controller');
const validate = require('../../middleware/validate');
const auth = require('../../middleware/auth');
const { addItemSchema, updateItemSchema } = require('./cart.validation');

const router = express.Router();

// All cart routes require authentication
router.use(auth);

router.get('/', cartController.get);
router.post('/items', validate(addItemSchema), cartController.add);
router.put('/items/:itemId', validate(updateItemSchema), cartController.updateQuantity);
router.delete('/items/:itemId', cartController.remove);
router.delete('/', cartController.clear);

module.exports = router;
