const vendorService = require('./vendor.service');
const apiResponse = require('../../utils/apiResponse');

const getProducts = async (req, res, next) => {
  try {
    const result = await vendorService.getVendorProducts(req.user.id, req.query);
    return apiResponse.success(res, result);
  } catch (err) {
    next(err);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const result = await vendorService.getVendorOrders(req.user.id, req.query);
    return apiResponse.success(res, result);
  } catch (err) {
    next(err);
  }
};

const getStats = async (req, res, next) => {
  try {
    const result = await vendorService.getVendorStats(req.user.id);
    return apiResponse.success(res, result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProducts,
  getOrders,
  getStats,
};
