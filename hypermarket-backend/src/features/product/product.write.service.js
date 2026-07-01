const Product = require('./product.model');
const AppError = require('../../utils/apiError');
const eventBus = require('../../config/eventBus');

const createProduct = async (data, vendorId) => {
  const product = await Product.create({ ...data, vendor: vendorId });
  const populated = await product.populate([
    { path: 'category', select: 'name slug' },
    { path: 'vendor', select: 'name' },
  ]);

  // Emit event — productSubscribers handles audit logging, search indexing etc.
  eventBus.emit('product.created', populated);

  return populated;
};

const updateProduct = async (id, data, user) => {
  const product = await Product.findById(id);

  if (!product) throw new AppError('Product not found', 404);

  if (user.role !== 'admin' && product.vendor.toString() !== user.id) {
    throw new AppError('You can only update your own products', 403);
  }

  Object.assign(product, data);
  await product.save();

  return product.populate([
    { path: 'category', select: 'name slug' },
    { path: 'vendor', select: 'name' },
  ]);
};

const deleteProduct = async (id, user) => {
  const product = await Product.findById(id);

  if (!product) throw new AppError('Product not found', 404);

  if (user.role !== 'admin' && product.vendor.toString() !== user.id) {
    throw new AppError('You can only delete your own products', 403);
  }

  await Product.findByIdAndDelete(id);

  // Emit event — productSubscribers handles cleanup, search index removal etc.
  eventBus.emit('product.deleted', product);

  return product;
};

const addProductImages = async (id, imageUrls, user) => {
  const product = await Product.findById(id);

  if (!product) throw new AppError('Product not found', 404);

  if (user.role !== 'admin' && product.vendor.toString() !== user.id) {
    throw new AppError('You can only update your own products', 403);
  }

  product.images.push(...imageUrls);
  return product.save();
};

const getVendorProducts = async (vendorId) => {
  return Product.find({ vendor: vendorId })
    .populate('category', 'name slug')
    .sort({ createdAt: -1 });
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  addProductImages,
  getVendorProducts,
};
