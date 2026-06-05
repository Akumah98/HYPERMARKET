const Category = require('./category.model');
const AppError = require('../../utils/apiError');

const createCategory = async (data) => {
  const existing = await Category.findOne({ name: data.name });
  if (existing) throw new AppError('Category already exists', 409);
  return Category.create(data);
};

const getAllCategories = async (includeInactive = false) => {
  const filter = includeInactive ? {} : { isActive: true };
  return Category.find(filter).sort({ name: 1 });
};

const getCategoryById = async (id) => {
  const category = await Category.findById(id);
  if (!category) throw new AppError('Category not found', 404);
  return category;
};

const getCategoryBySlug = async (slug) => {
  const category = await Category.findOne({ slug });
  if (!category) throw new AppError('Category not found', 404);
  return category;
};

const updateCategory = async (id, data) => {
  const category = await Category.findById(id);
  if (!category) throw new AppError('Category not found', 404);

  Object.assign(category, data);
  return category.save();
};

const deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);
  if (!category) throw new AppError('Category not found', 404);
  return category;
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
};
