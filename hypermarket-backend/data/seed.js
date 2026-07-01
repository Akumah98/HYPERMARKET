const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const User = require('../src/features/auth/user.model');
const Category = require('../src/features/category/category.model');
const Product = require('../src/features/product/product.model');
const Review = require('../src/features/review/review.model');
const data = require('./data.json');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Promise.all([
      User.deleteMany({}),
      Category.deleteMany({}),
      Product.deleteMany({}),
      Review.deleteMany({}),
    ]);
    console.log('Cleared existing data');

    const customer = await User.create({
      name: 'Jean-Marc Ebongue', email: 'jean@test.com', password: 'Test123456', role: 'customer', phone: '237670000000',
    });
    const vendor = await User.create({
      name: 'Mami Wata Organics', email: 'mami@test.com', password: 'Vendor123', role: 'vendor', phone: '237680000000',
    });
    const admin = await User.create({
      name: 'Admin User', email: 'admin@hypermarket.cm', password: 'Admin123456', role: 'admin', phone: '237690000000',
    });

    const categoryMap = {};
    for (const catData of data.categories) {
      const cat = await Category.create(catData);
      categoryMap[cat.name] = cat._id;
    }
    console.log(`Created ${data.categories.length} categories`);

    const productMap = {};
    for (const p of data.products) {
      const product = await Product.create({
        ...p,
        category: categoryMap[p.categoryName],
        vendor: vendor._id,
      });
      productMap[product.name] = product._id;
    }
    console.log(`Created ${data.products.length} products`);

    const userMap = { 'jean@test.com': customer._id, 'mami@test.com': vendor._id };
    const reviewDocs = data.reviews.map((r) => ({
      product: productMap[r.productName],
      user: userMap[r.userName],
      rating: r.rating,
      comment: r.comment,
    }));
    await Review.insertMany(reviewDocs);
    console.log(`Created ${reviewDocs.length} reviews`);

    console.log('\n✅ Seed complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
};

seed();
