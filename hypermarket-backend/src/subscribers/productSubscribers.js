'use strict';

const path = require('path');
const eventBus = require(path.join(__dirname, '../config/eventBus'));
const cache = require(path.join(__dirname, '../utils/cache'));

eventBus.on('product.created', async (product) => {
  try {
    console.log(`[EVENT] product.created => "${product.name}" (ID: ${product._id})`);
    await cache.invalidatePattern('products:*');
  } catch (err) {
    console.error('[EVENT ERROR] product.created:', err.message);
  }
});

eventBus.on('product.updated', async (product) => {
  try {
    console.log(`[EVENT] product.updated => "${product.name}" (ID: ${product._id})`);
    await cache.invalidatePattern('products:*');
  } catch (err) {
    console.error('[EVENT ERROR] product.updated:', err.message);
  }
});

eventBus.on('product.deleted', async (product) => {
  try {
    console.log(`[EVENT] product.deleted => "${product.name}" (ID: ${product._id})`);
    await cache.invalidatePattern('products:*');
  } catch (err) {
    console.error('[EVENT ERROR] product.deleted:', err.message);
  }
});

module.exports = {};
