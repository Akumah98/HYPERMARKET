const adminService = require('./admin.service');
const apiResponse = require('../../utils/apiResponse');

const getUsers = async (req, res, next) => {
  try {
    const result = await adminService.getAllUsers(req.query);
    return apiResponse.success(res, result);
  } catch (err) {
    next(err);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const result = await adminService.getAllOrders(req.query);
    return apiResponse.success(res, result);
  } catch (err) {
    next(err);
  }
};

const getStats = async (req, res, next) => {
  try {
    const result = await adminService.getPlatformStats();
    return apiResponse.success(res, result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  getOrders,
  getStats,
};
