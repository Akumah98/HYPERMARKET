const createService = require('./order.create.service');
const queryService = require('./order.query.service');
const { success } = require('../../utils/apiResponse');

const create = async (req, res, next) => {
  try {
    const order = await createService.createOrder(req.user.id, req.body);
    success(res, order, 201);
  } catch (error) {
    next(error);
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const result = await queryService.getUserOrders(req.user.id, req.query);
    success(res, result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const order = await queryService.getOrderById(req.params.id, req.user.id);
    success(res, order);
  } catch (error) {
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const order = await queryService.updateOrderStatus(
      req.params.id,
      req.body.status
    );
    success(res, order);
  } catch (error) {
    next(error);
  }
};

const cancel = async (req, res, next) => {
  try {
    const order = await queryService.cancelOrder(req.params.id, req.user.id);
    success(res, order);
  } catch (error) {
    next(error);
  }
};

module.exports = { create, getMyOrders, getById, updateStatus, cancel };
