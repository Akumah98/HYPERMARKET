const notificationService = require('./notification.service');
const apiResponse = require('../../utils/apiResponse');

const register = async (req, res, next) => {
  try {
    const { token } = req.body;
    await notificationService.registerToken(req.user.id, token);
    return apiResponse.success(res, { message: 'Push token registered successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
};
