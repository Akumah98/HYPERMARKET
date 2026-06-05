const Cart = require('./cart.model');
const Product = require('../product/product.model');
const AppError = require('../../utils/apiError');

const DELIVERY_FEE = 1500;

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate(
    'items.product',
    'name price stock images unit category'
  );

  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }

  return cart;
};

const getCart = async (userId) => {
  const cart = await getOrCreateCart(userId);
  const subtotal = cart.getSubtotal();

  return {
    items: cart.items,
    itemCount: cart.items.length,
    subtotal,
    deliveryFee: cart.items.length > 0 ? DELIVERY_FEE : 0,
    total: cart.items.length > 0 ? subtotal + DELIVERY_FEE : 0,
  };
};

const addItem = async (userId, productId, quantity) => {
  const product = await Product.findById(productId);
  if (!product) throw new AppError('Product not found', 404);
  if (!product.isActive) throw new AppError('Product is unavailable', 400);
  if (product.stock < quantity) {
    throw new AppError(`Only ${product.stock} left in stock`, 400);
  }

  const cart = await getOrCreateCart(userId);
  const existingItem = cart.items.find(
    (item) => item.product._id.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
    existingItem.priceSnapshot = product.price;
  } else {
    cart.items.push({
      product: productId,
      quantity,
      priceSnapshot: product.price,
    });
  }

  await cart.save();
  return getCart(userId);
};

const updateItemQuantity = async (userId, itemId, quantity) => {
  const cart = await getOrCreateCart(userId);
  const item = cart.items.id(itemId);
  if (!item) throw new AppError('Item not found in cart', 404);

  item.quantity = quantity;
  await cart.save();
  return getCart(userId);
};

const removeItem = async (userId, itemId) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new AppError('Cart not found', 404);

  cart.items.pull({ _id: itemId });
  await cart.save();
  return getCart(userId);
};

const clearCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId });
  if (cart) {
    cart.items = [];
    await cart.save();
  }
  return { items: [], itemCount: 0, subtotal: 0, deliveryFee: 0, total: 0 };
};

module.exports = {
  getCart,
  addItem,
  updateItemQuantity,
  removeItem,
  clearCart,
  DELIVERY_FEE,
};
