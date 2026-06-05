const Product = require('../product/product.model');
const Order = require('../order/order.model');
const { buildPaginationMeta } = require('../../utils/pagination');

const getVendorProducts = async (vendorId, query = {}) => {
  const page = parseInt(query.page, 10) || 1;
  const limit = Math.min(parseInt(query.limit, 10) || 10, 50);
  const skip = (page - 1) * limit;

  const filter = { vendor: vendorId };
  const [products, totalCount] = await Promise.all([
    Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Product.countDocuments(filter),
  ]);

  return {
    products,
    pagination: buildPaginationMeta(page, limit, totalCount),
  };
};

const getVendorOrders = async (vendorId, query = {}) => {
  const page = parseInt(query.page, 10) || 1;
  const limit = Math.min(parseInt(query.limit, 10) || 10, 50);
  const skip = (page - 1) * limit;

  const vendorProductIds = await Product.find({ vendor: vendorId }).distinct('_id');
  const filter = { 'items.product': { $in: vendorProductIds } };

  if (query.status) filter.status = query.status;

  const [orders, totalCount] = await Promise.all([
    Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Order.countDocuments(filter),
  ]);

  return {
    orders,
    pagination: buildPaginationMeta(page, limit, totalCount),
  };
};

const getVendorStats = async (vendorId) => {
  const vendorProductIds = await Product.find({ vendor: vendorId }).distinct('_id');
  
  const orders = await Order.find({
    'items.product': { $in: vendorProductIds },
    paymentStatus: 'paid',
  });

  let totalRevenue = 0;
  let deliveredOrdersCount = 0;
  const productSalesMap = {};

  orders.forEach((order) => {
    if (order.status === 'delivered') {
      deliveredOrdersCount++;
    }

    order.items.forEach((item) => {
      if (vendorProductIds.some((id) => id.toString() === item.product.toString())) {
        const itemRevenue = item.price * item.quantity;
        totalRevenue += itemRevenue;

        const prodId = item.product.toString();
        productSalesMap[prodId] = productSalesMap[prodId] || {
          product: item.product,
          name: item.name,
          quantitySold: 0,
          revenue: 0,
        };
        productSalesMap[prodId].quantitySold += item.quantity;
        productSalesMap[prodId].revenue += itemRevenue;
      }
    });
  });

  const topProducts = Object.values(productSalesMap)
    .sort((a, b) => b.quantitySold - a.quantitySold)
    .slice(0, 5);

  return {
    totalRevenue,
    deliveredOrdersCount,
    totalSales: orders.length,
    topProducts,
  };
};

module.exports = {
  getVendorProducts,
  getVendorOrders,
  getVendorStats,
};
