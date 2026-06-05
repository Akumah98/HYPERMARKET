const jwt = require('jsonwebtoken');
const AppError = require('../utils/apiError');
const { jwtSecret } = require('../config/env');

const auth = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return next(new AppError('No token provided', 401));
  }

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
