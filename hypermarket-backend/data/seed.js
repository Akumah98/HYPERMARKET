/**
 * Database Seed Script
 * Populates DB with categories, products, and reviews from data.json
 * Usage: node data/seed.js
 */
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

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Category.deleteMany({}),
      Product.deleteMany({}),
      Review.deleteMany({}),
    ]);
    console.log('Cleared existing data');

    // Create users
    const customer = await User.create({
      name: 'Jean-Marc Ebongue',
      email: 'jean@test.com',
      password: 'Test123456',
      role: 'customer',
      phone: '237670000000',
    });

    const vendor = await User.create({
      name: 'Mami Wata Organics',
      email: 'mami@test.com',
      password: 'Vendor123',
      role: 'vendor',
      phone: '237680000000',
    });

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@hypermarket.cm',
      password: 'Admin123456',
      role: 'admin',
      phone: '237690000000',
    });

    console.log(`Created ${3} users`);

    // Create categories (use create to trigger pre-save slug hook)
    const categoryMap = {};
    for (const catData of data.categories) {
      const cat = await Category.create(catData);
      categoryMap[cat.name] = cat._id;
    }
    console.log(`Created ${data.categories.length} categories`);

    // Create products (use create to trigger pre-save slug hook)
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

    // Create reviews
    const userMap = {
      'jean@test.com': customer._id,
      'mami@test.com': vendor._id,
    };
    const reviewDocs = data.reviews.map((r) => ({
      product: productMap[r.productName],
      user: userMap[r.userName],
      rating: r.rating,
      comment: r.comment,
    }));
    await Review.insertMany(reviewDocs);
    console.log(`Created ${reviewDocs.length} reviews`);

    console.log('\n✅ Seed complete!');
    console.log('  Customer: jean@test.com / Test123456');
    console.log('  Vendor:   mami@test.com / Vendor123');
    console.log('  Admin:    admin@hypermarket.cm / Admin123456');

    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
};

seed();
