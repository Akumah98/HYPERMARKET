const cartService = require('./cart.service');
const { success } = require('../../utils/apiResponse');

const get = async (req, res, next) => {
  try {
    const cart = await cartService.getCart(req.user.id);
    success(res, cart);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const cart = await cartService.addItem(
      req.user.id, req.body.product, req.body.quantity
    );
    success(res, cart, 201);
  } catch (error) {
    next(error);
  }
};

const updateQuantity = async (req, res, next) => {
  try {
    const cart = await cartService.updateItemQuantity(
      req.user.id, req.params.itemId, req.body.quantity
    );
    success(res, cart);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const cart = await cartService.removeItem(req.user.id, req.params.itemId);
    success(res, cart);
  } catch (error) {
    next(error);
  }
};

const clear = async (req, res, next) => {
  try {
    const cart = await cartService.clearCart(req.user.id);
    success(res, cart);
  } catch (error) {
    next(error);
  }
};

module.exports = { get, add, updateQuantity, remove, clear };
