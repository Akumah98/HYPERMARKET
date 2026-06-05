const User = require('../auth/user.model');
const Order = require('../order/order.model');
const Product = require('../product/product.model');
const { buildPaginationMeta } = require('../../utils/pagination');

const getAllUsers = async (query = {}) => {
  const page = parseInt(query.page, 10) || 1;
  const limit = Math.min(parseInt(query.limit, 10) || 10, 50);
  const skip = (page - 1) * limit;

  const filter = {};
  if (query.role) filter.role = query.role;

  const [users, totalCount] = await Promise.all([
    User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    User.countDocuments(filter),
  ]);

  return {
    users,
    pagination: buildPaginationMeta(page, limit, totalCount),
  };
};

const getAllOrders = async (query = {}) => {
  const page = parseInt(query.page, 10) || 1;
  const limit = Math.min(parseInt(query.limit, 10) || 10, 50);
  const skip = (page - 1) * limit;

  const filter = {};
  if (query.status) filter.status = query.status;
  if (query.paymentStatus) filter.paymentStatus = query.paymentStatus;

  const [orders, totalCount] = await Promise.all([
    Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Order.countDocuments(filter),
  ]);

  return {
    orders,
    pagination: buildPaginationMeta(page, limit, totalCount),
  };
};

const getPlatformStats = async () => {
  const [totalUsers, totalOrders, totalProducts, paidOrders] = await Promise.all([
    User.countDocuments(),
    Order.countDocuments(),
    Product.countDocuments({ isActive: { $ne: false } }),
    Order.find({ paymentStatus: 'paid' }),
  ]);

  const totalRevenue = paidOrders.reduce((sum, order) => sum + order.total, 0);

  return {
    totalUsers,
    totalOrders,
    totalProducts,
    totalRevenue,
  };
};

module.exports = {
  getAllUsers,
  getAllOrders,
  getPlatformStats,
};
