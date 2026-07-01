const Order = require('./order.model');
const Cart = require('../cart/cart.model');
const Product = require('../product/product.model');
const AppError = require('../../utils/apiError');
const { generateOrderId } = require('./order.helpers');
const { DELIVERY_FEE } = require('../cart/cart.service');
const eventBus = require('../../config/eventBus');

const createOrder = async (userId, orderData) => {
  const cart = await Cart.findOne({ user: userId }).populate(
    'items.product',
    'name price stock images'
  );

  if (!cart || cart.items.length === 0) {
    throw new AppError('Cart is empty', 400);
  }

  // Validate stock for each item
  for (const item of cart.items) {
    if (!item.product) {
      throw new AppError(
        'One or more items in your cart are no longer available. Please remove them and try again.',
        400
      );
    }
    if (item.product.stock < item.quantity) {
      throw new AppError(
        `"${item.product.name}" only has ${item.product.stock} left`,
        400
      );
    }
  }

  // Build order items from cart
  const orderItems = cart.items.map((item) => ({
    product: item.product._id,
    name: item.product.name,
    price: item.priceSnapshot,
    quantity: item.quantity,
    image: item.product.images[0] || '',
  }));

  const subtotal = cart.getSubtotal();
  const deliveryFee =
    orderData.deliveryMethod === 'store_pickup' ? 0 : DELIVERY_FEE;

  const order = await Order.create({
    orderId: generateOrderId(),
    user: userId,
    items: orderItems,
    deliveryMethod: orderData.deliveryMethod,
    shipping: orderData.shipping,
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    paymentMethod: orderData.paymentMethod,
  });

  // Reduce stock for each product
  for (const item of cart.items) {
    await Product.findByIdAndUpdate(item.product._id, {
      $inc: { stock: -item.quantity },
    });
  }

  // Clear the cart
  cart.items = [];
  await cart.save();

  // Emit event — downstream subscribers handle notifications etc.
  eventBus.emit('order.placed', order);

  return order;
};

module.exports = { createOrder };
