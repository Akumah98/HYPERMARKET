const jwt = require('jsonwebtoken');
const User = require('./user.model');
const AppError = require('../../utils/apiError');
const { jwtSecret, jwtExpiresIn } = require('../../config/env');

const generateToken = (user) => jwt.sign({ id: user._id, email: user.email, role: user.role }, jwtSecret, { expiresIn: jwtExpiresIn });

const registerUser = async ({ name, email, password, role, phone }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new AppError('Email already registered', 409);
  const user = await User.create({ name, email, password, role, phone });
  return { token: generateToken(user), user: { id: user._id, name: user.name, email: user.email, role: user.role } };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) throw new AppError('Invalid email or password', 401);
  return { token: generateToken(user), user: { id: user._id, name: user.name, email: user.email, role: user.role } };
};

const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new AppError('User not found', 404);
  return { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone, address: user.address, billing: user.billing || { paymentMethod: '', phone: '' }, createdAt: user.createdAt };
};

const updateUserProfile = async (id, updateData) => {
  const user = await User.findById(id);
  if (!user) throw new AppError('User not found', 404);
  if (updateData.name) user.name = updateData.name;
  if (updateData.phone !== undefined) user.phone = updateData.phone;
  if (updateData.address) user.address = { ...user.address.toObject(), ...updateData.address };
  if (updateData.billing) user.billing = { ...user.billing.toObject(), ...updateData.billing };
  await user.save();
  return { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone, address: user.address, billing: user.billing || { paymentMethod: '', phone: '' }, createdAt: user.createdAt };
};

module.exports = { registerUser, loginUser, getUserById, updateUserProfile };
