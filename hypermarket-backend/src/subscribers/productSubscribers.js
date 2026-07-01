'use strict';

const eventBus = require('../../config/eventBus');

/**
 * Subscriber: PRODUCT CREATED
 * Fires when a vendor successfully adds a new product.
 * Responsibilities:
 *  - Log the catalog addition for audit purposes
 *  - (Extendable) Trigger search index update, notify interested customers, etc.
 */
eventBus.on('product.created', async (product) => {
  try {
    console.log(`[EVENT] product.created => "${product.name}" (ID: ${product._id}) by vendor ${product.vendor}`);
    // Future: trigger search engine index update, push to interested customers in category, etc.
  } catch (err) {
    console.error('[EVENT ERROR] product.created:', err.message);
  }
});

/**
 * Subscriber: PRODUCT DELETED
 * Fires when a vendor or admin deletes a product.
 * Responsibilities:
 *  - Log the deletion for audit trail
 *  - (Extendable) Remove from search index, notify wishlist subscribers, etc.
 */
eventBus.on('product.deleted', async (product) => {
  try {
    console.log(`[EVENT] product.deleted => "${product.name}" (ID: ${product._id})`);
    // Future: remove from search index, clean up wishlists, etc.
  } catch (err) {
    console.error('[EVENT ERROR] product.deleted:', err.message);
  }
});

module.exports = {};
