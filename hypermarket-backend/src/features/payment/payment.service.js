const Order = require('../order/order.model');
const fapshi = require('../../config/fapshi');
const AppError = require('../../utils/apiError');

const initiatePayment = async (userId, orderId, phone) => {
  const order = await Order.findOne({ _id: orderId, user: userId }).populate('user');
  if (!order) {
    throw new AppError('Order not found', 404);
  }

  if (order.paymentStatus === 'paid') {
    throw new AppError('Order is already paid', 400);
  }

  const payload = {
    amount: Math.round(order.total),
    phone,
    medium: order.paymentMethod === 'orange_money' ? 'orange money' : 'mobile money',
    name: order.shipping.fullName,
    email: order.user?.email || 'customer@hypermarket.cm',
    userId: userId.toString(),
    externalId: order._id.toString(),
    message: `Hypermarket Order #${order.orderId}`,
  };

  const result = await fapshi.directPay(payload);
  
  if (result.statusCode !== 200) {
    throw new AppError(result.message || 'Payment initiation failed', result.statusCode || 400);
  }

  order.transactionRef = result.transId;
  order.paymentStatus = 'pending';
  await order.save();

  // Save/update user's preferred billing information
  const User = require('../auth/user.model');
  await User.findByIdAndUpdate(userId, {
    billing: {
      paymentMethod: order.paymentMethod,
      phone,
    }
  }).catch(() => {});

  return { transId: result.transId };
};

const verifyPayment = async (transId) => {
  const result = await fapshi.paymentStatus(transId);
  if (result.statusCode !== 200) {
    throw new AppError(result.message || 'Transaction verification failed', result.statusCode || 400);
  }

  let order = await Order.findOne({ transactionRef: transId });
  if (!order && result.externalId) {
    order = await Order.findById(result.externalId);
  }

  if (order) {
    if (result.status === 'SUCCESSFUL') {
      order.paymentStatus = 'paid';
      order.status = 'processing';
      await order.save();
    } else if (result.status === 'FAILED' || result.status === 'EXPIRED') {
      order.paymentStatus = 'failed';
      await order.save();
    }
  }

  return result;
};

module.exports = {
  initiatePayment,
  verifyPayment,
};
