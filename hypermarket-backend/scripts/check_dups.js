const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const Product = require('../src/features/product/product.model');

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to Atlas');

  const total = await Product.countDocuments();
  console.log('Total products:', total);

  // Check for duplicate image URLs
  const dups = await Product.aggregate([
    { $unwind: '$images' },
    { $group: { _id: '$images.url', count: { $sum: 1 }, names: { $push: '$name' } } },
    { $match: { count: { $gt: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 }
  ]);

  if (dups.length === 0) {
    console.log('✅ No duplicate image URLs found — all products have unique images!');
  } else {
    console.log('❌ Duplicate image URLs found:');
    dups.forEach(d => console.log(`  URL used ${d.count}x: ${d._id}`));
    console.log('  Sample products sharing these images:', dups[0].names.slice(0, 3));
  }

  // Show a sample of 5 products with their images
  const sample = await Product.find({}, { name: 1, images: 1 }).limit(5);
  console.log('\n--- Sample Products ---');
  sample.forEach(p => {
    console.log(`${p.name} -> ${p.images && p.images[0] ? p.images[0].url : 'NO IMAGE'}`);
  });

  process.exit(0);
}

run().catch(e => { console.error(e.message); process.exit(1); });
