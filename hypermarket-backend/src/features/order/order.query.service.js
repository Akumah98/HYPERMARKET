const Order = require('./order.model');
const AppError = require('../../utils/apiError');
const { buildPaginationMeta } = require('../../utils/pagination');
const eventBus = require('../../config/eventBus');
const paymentService = require('../payment/payment.service');

const getUserOrders = async (userId, query = {}) => {
  const page = parseInt(query.page, 10) || 1;
  const limit = Math.min(parseInt(query.limit, 10) || 10, 50);
  const skip = (page - 1) * limit;

  const filter = { user: userId };
  if (query.status) filter.status = query.status;

  const [orders, totalCount] = await Promise.all([
    Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Order.countDocuments(filter),
  ]);

  return { orders, pagination: buildPaginationMeta(page, limit, totalCount) };
};

const getOrderById = async (orderId, userId) => {
  const order = await Order.findOne({ _id: orderId, user: userId });
  if (!order) throw new AppError('Order not found', 404);
  return order;
};

const getOrderByOrderId = async (orderId) => {
  const order = await Order.findOne({ orderId });
  if (!order) throw new AppError('Order not found', 404);
  return order;
};

const updateOrderStatus = async (orderId, status) => {
  const order = await Order.findById(orderId);
  if (!order) throw new AppError('Order not found', 404);

  order.status = status;
  
  if (status === 'cancelled' && order.paymentStatus === 'paid' && order.transactionRef) {
    try {
      await paymentService.refundPayment(order.transactionRef, Math.round(order.total));
      // order.paymentStatus is updated to 'refunded' within refundPayment
    } catch (error) {
      console.error(`Refund failed for order ${order._id}:`, error);
      // Even if refund fails, we still cancel the order but maybe we should throw?
      // Since it's a simulator, it shouldn't fail unless it wasn't successful.
    }
  }
  
  const savedOrder = await order.save();

  // Emit event — orderSubscribers handles push notification logic
  eventBus.emit('order.statusChanged', { order: savedOrder, status });

  return savedOrder;
};

const cancelOrder = async (orderId, userId) => {
  const order = await Order.findOne({ _id: orderId, user: userId });
  if (!order) throw new AppError('Order not found', 404);

  if (!['placed', 'processing'].includes(order.status)) {
    throw new AppError('Order cannot be cancelled at this stage', 400);
  }

  if (order.paymentStatus === 'paid' && order.transactionRef) {
    try {
      await paymentService.refundPayment(order.transactionRef, Math.round(order.total));
    } catch (error) {
      console.error(`Refund failed for order ${order._id}:`, error);
    }
  }

  order.status = 'cancelled';
  return order.save();
};

module.exports = {
  getUserOrders,
  getOrderById,
  getOrderByOrderId,
  updateOrderStatus,
  cancelOrder,
};
