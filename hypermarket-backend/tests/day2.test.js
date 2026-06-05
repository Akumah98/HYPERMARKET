/**
 * Day 2 Test Script — Category, Product, Review APIs
 * Requires: seed data loaded (run `node data/seed.js` first)
 */
const http = require('http');

const BASE_URL = 'http://localhost:5000';
let vendorToken = '';
let adminToken = '';
let customerToken = '';
let testsPassed = 0;
let testsFailed = 0;

const request = (method, path, body = null, token = '') => {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: { 'Content-Type': 'application/json' },
    };
    if (token) options.headers['Authorization'] = `Bearer ${token}`;

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
};

const test = async (name, fn) => {
  try {
    await fn();
    testsPassed++;
    console.log(`  ✅ PASS: ${name}`);
  } catch (err) {
    testsFailed++;
    console.log(`  ❌ FAIL: ${name} — ${err.message}`);
  }
};

const assert = (condition, msg) => { if (!condition) throw new Error(msg); };

const run = async () => {
  console.log('\n🧪 DAY 2: CATEGORY + PRODUCT + REVIEW TESTS');
  console.log('='.repeat(55));

  // Login all users
  console.log('\n📋 Setup — Login Users');
  const vRes = await request('POST', '/api/auth/login', {
    email: 'mami@test.com', password: 'Vendor123',
  });
  vendorToken = vRes.body.data.token;

  const aRes = await request('POST', '/api/auth/login', {
    email: 'admin@hypermarket.cm', password: 'Admin123456',
  });
  adminToken = aRes.body.data.token;

  const cRes = await request('POST', '/api/auth/login', {
    email: 'jean@test.com', password: 'Test123456',
  });
  customerToken = cRes.body.data.token;
  console.log('  ✅ All users logged in');

  // ---- CATEGORIES ----
  console.log('\n📋 Categories');
  let categories = [];

  await test('GET /categories returns seeded data', async () => {
    const res = await request('GET', '/api/categories');
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.body.data.length >= 8, `Expected 8+ categories`);
    categories = res.body.data;
  });

  await test('GET /categories/:slug returns single', async () => {
    const res = await request('GET', '/api/categories/local-produce');
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.body.data.name === 'Local Produce', 'Wrong category');
  });

  await test('POST /categories requires admin', async () => {
    const res = await request('POST', '/api/categories',
      { name: 'Test Cat' }, vendorToken);
    assert(res.status === 403, `Expected 403, got ${res.status}`);
  });

  await test('POST /categories works for admin', async () => {
    const res = await request('POST', '/api/categories',
      { name: 'New Category', description: 'Test' }, adminToken);
    assert(res.status === 201, `Expected 201, got ${res.status}`);
  });

  // ---- PRODUCTS ----
  console.log('\n📋 Products');

  await test('GET /products returns paginated list', async () => {
    const res = await request('GET', '/api/products?limit=5');
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.body.data.products.length <= 5, 'Limit not respected');
    assert(res.body.data.pagination, 'Missing pagination meta');
  });

  await test('GET /products filters by category', async () => {
    const catId = categories.find((c) => c.name === 'Pantry Essentials')._id;
    const res = await request('GET', `/api/products?category=${catId}`);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    res.body.data.products.forEach((p) => {
      assert(p.category._id === catId, 'Wrong category in results');
    });
  });

  await test('GET /products sorts by price ascending', async () => {
    const res = await request('GET', '/api/products?sort=price_asc');
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    const prices = res.body.data.products.map((p) => p.price);
    for (let i = 1; i < prices.length; i++) {
      assert(prices[i] >= prices[i - 1], 'Not sorted by price asc');
    }
  });

  await test('GET /products/slug/:slug returns product', async () => {
    const res = await request('GET', '/api/products/slug/premium-jasmine-rice-5kg');
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.body.data.price === 7500, 'Wrong price');
    assert(res.body.data.vendor.name, 'Missing vendor populate');
    assert(res.body.data.category.name, 'Missing category populate');
  });

  let newProductId = '';
  await test('POST /products creates as vendor', async () => {
    const catId = categories.find((c) => c.name === 'Beverages')._id;
    const res = await request('POST', '/api/products', {
      name: 'Test Drink 500mL',
      price: 500,
      category: catId,
      stock: 100,
      unit: 'mL',
    }, vendorToken);
    assert(res.status === 201, `Expected 201, got ${res.status}`);
    newProductId = res.body.data._id;
  });

  await test('POST /products blocked for customers', async () => {
    const catId = categories.find((c) => c.name === 'Beverages')._id;
    const res = await request('POST', '/api/products', {
      name: 'Fake', price: 100, category: catId, stock: 1,
    }, customerToken);
    assert(res.status === 403, `Expected 403, got ${res.status}`);
  });

  await test('PUT /products/:id updates own product', async () => {
    const res = await request('PUT', `/api/products/${newProductId}`,
      { price: 600 }, vendorToken);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.body.data.price === 600, 'Price not updated');
  });

  await test('GET /products/vendor/me returns vendor products', async () => {
    const res = await request('GET', '/api/products/vendor/me', null, vendorToken);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.body.data.length > 0, 'Expected vendor products');
  });

  await test('DELETE /products/:id deletes own product', async () => {
    const res = await request('DELETE', `/api/products/${newProductId}`,
      null, vendorToken);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  // ---- REVIEWS ----
  console.log('\n📋 Reviews');

  // Get a product to review
  const prodRes = await request('GET', '/api/products/slug/smoked-catfish-large');
  const reviewProductId = prodRes.body.data._id;

  await test('POST /reviews creates review', async () => {
    const res = await request('POST', '/api/reviews', {
      product: reviewProductId, rating: 5, comment: 'Great smoked fish!',
    }, customerToken);
    assert(res.status === 201, `Expected 201, got ${res.status}`);
  });

  await test('POST /reviews prevents duplicate', async () => {
    const res = await request('POST', '/api/reviews', {
      product: reviewProductId, rating: 4, comment: 'Again',
    }, customerToken);
    assert(res.status === 409, `Expected 409, got ${res.status}`);
  });

  await test('GET /reviews/product/:id returns reviews', async () => {
    const res = await request('GET', `/api/reviews/product/${reviewProductId}`);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.body.data.length >= 1, 'Expected reviews');
  });

  await test('Product rating updated after review', async () => {
    const res = await request('GET', `/api/products/${reviewProductId}`);
    assert(res.body.data.averageRating > 0, 'Rating not updated');
    assert(res.body.data.reviewCount > 0, 'Count not updated');
  });

  // Summary
  console.log('\n' + '='.repeat(55));
  console.log(`📊 Results: ${testsPassed} passed, ${testsFailed} failed`);
  console.log('='.repeat(55));
  if (testsFailed > 0) process.exit(1);
};

run().catch((err) => {
  console.error('\n💥 Test runner crashed:', err.message);
  process.exit(1);
});
