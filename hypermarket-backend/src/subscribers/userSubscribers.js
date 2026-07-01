'use strict';

const eventBus = require('../../config/eventBus');
const Cart = require('../cart/cart.model');

/**
 * Subscriber: USER REGISTERED
 * Fires when a new customer or vendor registers.
 * Responsibilities:
 *  - Automatically provision an empty cart for new customers
 *  - Log registration for audit trail
 */
eventBus.on('user.registered', async (user) => {
  try {
    console.log(`[EVENT] user.registered => ${user.email} (role: ${user.role})`);

    if (user.role === 'customer') {
      await Cart.create({ user: user._id, items: [] });
      console.log(`[EVENT] Cart provisioned for new customer: ${user.email}`);
    }
  } catch (err) {
    console.error('[EVENT ERROR] user.registered:', err.message);
  }
});

module.exports = {};
