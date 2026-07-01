const authService = require('./auth.service');
const { success } = require('../../utils/apiResponse');
const eventBus = require('../../config/eventBus');

const register = async (req, res, next) => {
  try {
    const result = await authService.registerUser(req.body);

    // Emit event — userSubscribers handles cart provisioning, welcome emails etc.
    eventBus.emit('user.registered', result.user || result);

    success(res, result, 201);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.loginUser(req.body);
    success(res, result, 200);
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await authService.getUserById(req.user.id);
    success(res, user, 200);
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const user = await authService.updateUserProfile(req.user.id, req.body);
    success(res, user, 200);
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getMe, updateProfile };
