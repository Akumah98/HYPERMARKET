const paymentService = require('./payment.service');
const apiResponse = require('../../utils/apiResponse');

const initiate = async (req, res, next) => {
  try {
    const { orderId, phone } = req.body;
    const result = await paymentService.initiatePayment(req.user.id, orderId, phone);
    return apiResponse.success(res, result, 200);
  } catch (err) {
    next(err);
  }
};

const getStatus = async (req, res, next) => {
  try {
    const { transId } = req.params;
    const result = await paymentService.verifyPayment(transId);
    return apiResponse.success(res, result, 200);
  } catch (err) {
    next(err);
  }
};

const handleWebhook = async (req, res, next) => {
  try {
    const { transId } = req.body;
    await paymentService.verifyPayment(transId);
    return res.status(200).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  initiate,
  getStatus,
  handleWebhook,
};
