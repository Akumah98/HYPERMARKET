const Product = require('./product.model');
const AppError = require('../../utils/apiError');
const { buildPaginationMeta } = require('../../utils/pagination');

const SORT_OPTIONS = {
  price_asc: { price: 1 },
  price_desc: { price: -1 },
  newest: { createdAt: -1 },
  rating: { averageRating: -1 },
  name: { name: 1 },
};

const buildFilter = (query) => {
  const filter = { isActive: true };

  if (query.category) {
    if (query.category.includes(',')) {
      filter.category = { $in: query.category.split(',') };
    } else {
      filter.category = query.category;
    }
  }
  if (query.vendor) filter.vendor = query.vendor;
  if (query.search) filter.$text = { $search: query.search };
  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = query.minPrice;
    if (query.maxPrice) filter.price.$lte = query.maxPrice;
  }
  if (query.inStock === 'true' || query.inStock === true) {
    filter.stock = { $gt: 0 };
  }
  if (query.rating) {
    filter.averageRating = { $gte: parseFloat(query.rating) };
  }
  if (query.badges) {
    if (query.badges.includes(',')) {
      filter.badges = { $in: query.badges.split(',') };
    } else {
      filter.badges = query.badges;
    }
  }

  return filter;
};

const getProducts = async (query) => {
  const page = query.page || 1;
  const limit = query.limit || 12;
  const skip = (page - 1) * limit;
  const filter = buildFilter(query);
  const sort = SORT_OPTIONS[query.sort] || SORT_OPTIONS.newest;

  const [products, totalCount] = await Promise.all([
    Product.find(filter)
      .populate('category', 'name slug')
      .populate('vendor', 'name')
      .sort(sort)
      .skip(skip)
      .limit(limit),
    Product.countDocuments(filter),
  ]);

  return { products, pagination: buildPaginationMeta(page, limit, totalCount) };
};

const getProductBySlug = async (slug) => {
  const product = await Product.findOne({ slug })
    .populate('category', 'name slug')
    .populate('vendor', 'name phone');

  if (!product) throw new AppError('Product not found', 404);
  return product;
};

const getProductById = async (id) => {
  const product = await Product.findById(id)
    .populate('category', 'name slug')
    .populate('vendor', 'name');

  if (!product) throw new AppError('Product not found', 404);
  return product;
};

module.exports = { getProducts, getProductBySlug, getProductById };
