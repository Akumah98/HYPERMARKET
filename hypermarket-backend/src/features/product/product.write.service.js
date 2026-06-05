const Product = require('./product.model');
const AppError = require('../../utils/apiError');

const createProduct = async (data, vendorId) => {
  const product = await Product.create({ ...data, vendor: vendorId });
  return product.populate([
    { path: 'category', select: 'name slug' },
    { path: 'vendor', select: 'name' },
  ]);
};

const updateProduct = async (id, data, vendorId) => {
  const product = await Product.findById(id);

  if (!product) throw new AppError('Product not found', 404);

  if (product.vendor.toString() !== vendorId) {
    throw new AppError('You can only update your own products', 403);
  }

  Object.assign(product, data);
  await product.save();

  return product.populate([
    { path: 'category', select: 'name slug' },
    { path: 'vendor', select: 'name' },
  ]);
};

const deleteProduct = async (id, vendorId) => {
  const product = await Product.findById(id);

  if (!product) throw new AppError('Product not found', 404);

  if (product.vendor.toString() !== vendorId) {
    throw new AppError('You can only delete your own products', 403);
  }

  await Product.findByIdAndDelete(id);
  return product;
};

const addProductImages = async (id, imageUrls, vendorId) => {
  const product = await Product.findById(id);

  if (!product) throw new AppError('Product not found', 404);

  if (product.vendor.toString() !== vendorId) {
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
