const categoryService = require('./category.service');
const { success } = require('../../utils/apiResponse');

const create = async (req, res, next) => {
  try {
    const category = await categoryService.createCategory(req.body);
    success(res, category, 201);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const includeInactive = req.user && req.user.role === 'admin';
    const categories = await categoryService.getAllCategories(includeInactive);
    success(res, categories);
  } catch (error) {
    next(error);
  }
};

const getBySlug = async (req, res, next) => {
  try {
    const category = await categoryService.getCategoryBySlug(req.params.slug);
    success(res, category);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const category = await categoryService.updateCategory(
      req.params.id,
      req.body
    );
    success(res, category);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await categoryService.deleteCategory(req.params.id);
    success(res, { message: 'Category deleted' });
  } catch (error) {
    next(error);
  }
};

const uploadImage = async (req, res, next) => {
  try {
    const AppError = require('../../utils/apiError');
    if (!req.file) {
      throw new AppError('Please provide an image file', 400);
    }
    const category = await categoryService.updateCategory(req.params.id, {
      image: req.file.path,
    });
    success(res, category);
  } catch (error) {
    next(error);
  }
};

module.exports = { create, getAll, getBySlug, update, remove, uploadImage };
