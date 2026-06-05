const writeService = require('./product.write.service');
const { success } = require('../../utils/apiResponse');

const create = async (req, res, next) => {
  try {
    const product = await writeService.createProduct(req.body, req.user.id);
    success(res, product, 201);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const product = await writeService.updateProduct(
      req.params.id, req.body, req.user.id
    );
    success(res, product);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await writeService.deleteProduct(req.params.id, req.user.id);
    success(res, { message: 'Product deleted' });
  } catch (error) {
    next(error);
  }
};

const uploadImages = async (req, res, next) => {
  try {
    const imageUrls = req.files.map((file) => file.path);
    const product = await writeService.addProductImages(
      req.params.id, imageUrls, req.user.id
    );
    success(res, product);
  } catch (error) {
    next(error);
  }
};

const getMyProducts = async (req, res, next) => {
  try {
    const products = await writeService.getVendorProducts(req.user.id);
    success(res, products);
  } catch (error) {
    next(error);
  }
};

module.exports = { create, update, remove, uploadImages, getMyProducts };
