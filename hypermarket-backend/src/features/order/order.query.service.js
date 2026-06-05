const Order = require('./order.model');
const AppError = require('../../utils/apiError');
const { buildPaginationMeta } = require('../../utils/pagination');

const { sendPush } = require('../notification/notification.service');

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
  const savedOrder = await order.save();

  // Asynchronously send push notification to user
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

  sendPush(order.user, title, body, { orderId: order._id.toString(), status }).catch((err) =>
    console.error('Error triggering order status push:', err.message)
  );

  return savedOrder;
};

const cancelOrder = async (orderId, userId) => {
  const order = await Order.findOne({ _id: orderId, user: userId });
  if (!order) throw new AppError('Order not found', 404);

  if (!['placed', 'processing'].includes(order.status)) {
    throw new AppError('Order cannot be cancelled at this stage', 400);
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
