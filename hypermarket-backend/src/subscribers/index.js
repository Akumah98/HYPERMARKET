'use strict';

/**
 * Central subscriber bootstrapper.
 * Import all subscriber modules here so their event listeners
 * are registered when the server starts up.
 */
require('./orderSubscribers');
require('./productSubscribers');
require('./userSubscribers');

console.log('[EventBus] All subscribers registered successfully.');
