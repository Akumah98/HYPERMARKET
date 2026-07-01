'use strict';

const EventEmitter = require('events');

class HypermarketEventBus extends EventEmitter {}

const eventBus = new HypermarketEventBus();

// Prevent memory leak warnings for high-subscriber scenarios
eventBus.setMaxListeners(20);

module.exports = eventBus;
