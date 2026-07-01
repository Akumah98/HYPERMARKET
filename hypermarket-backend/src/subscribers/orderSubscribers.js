'use strict';

const path = require('path');
const eventBus = require(path.join(__dirname, '../config/eventBus'));
const { sendPush } = require(path.join(__dirname, '../features/notification/notification.service'));
const cache = require(path.join(__dirname, '../utils/cache'));

/**
 * Subscriber: ORDER PLACED
 * Fires when a customer successfully creates a new order.
 * Responsibilities:
 *  - Send push confirmation to the customer
 */
eventBus.on('order.placed', async (order) => {
  try {
    console.log(`[EVENT] order.placed => ${order.orderId}`);
    await cache.invalidatePattern('products:*');
    await sendPush(
      order.user,
      'Order Placed 🛒',
      `Your order ${order.orderId} has been received. We'll notify you when it's confirmed!`,
      { orderId: order._id.toString(), status: 'placed' }
    );
  } catch (err) {
    console.error('[EVENT ERROR] order.placed:', err.message);
  }
});

/**
 * Subscriber: ORDER STATUS CHANGED
 * Fires whenever a vendor/admin updates the status of an order.
 * Responsibilities:
 *  - Send push notification to the customer about the status update
 */
eventBus.on('order.statusChanged', async ({ order, status }) => {
  try {
    console.log(`[EVENT] order.statusChanged => ${order.orderId} | ${status}`);

    let title = 'Order Update';
    let body = `Your order status has been updated to ${status}.`;

    if (status === 'processing') {
      title = 'Order Confirmed 🛒';
      body = `Your order ${order.orderId} is being prepared by the vendor.`;
    } else if (status === 'ready') {
      title = 'Order Ready 📦';
      body = `Your order ${order.orderId} is ready for ${order.deliveryMethod === 'store_pickup' ? 'pickup' : 'delivery'}.`;
    } else if (status === 'delivered') {
      title = 'Order Delivered 🎉';
      body = `Your order ${order.orderId} has been successfully delivered.`;
    } else if (status === 'cancelled') {
      title = 'Order Cancelled ❌';
      body = `Your order ${order.orderId} has been cancelled.`;
    }

    await sendPush(
      order.user,
      title,
      body,
      { orderId: order._id.toString(), status }
    );
  } catch (err) {
    console.error('[EVENT ERROR] order.statusChanged:', err.message);
  }
});

module.exports = {};
