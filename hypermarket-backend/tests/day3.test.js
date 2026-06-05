/**
 * Day 3 Test Script — Cart + Order APIs
 * Requires: seed data loaded (run `node data/seed.js` first)
 */
const http = require('http');

const BASE = 'http://localhost:5000';
let customerToken = '';
let vendorToken = '';
let testsPassed = 0;
let testsFailed = 0;

const req = (method, path, body = null, token = '') => {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE);
    const opts = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: { 'Content-Type': 'application/json' },
    };
    if (token) opts.headers['Authorization'] = `Bearer ${token}`;

    const r = http.request(opts, (res) => {
      let d = '';
      res.on('data', (c) => (d += c));
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(d) }); }
        catch { resolve({ status: res.statusCode, body: d }); }
      });
    });
    r.on('error', reject);
    if (body) r.write(JSON.stringify(body));
    r.end();
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

const assert = (c, m) => { if (!c) throw new Error(m); };

const run = async () => {
  console.log('\n🧪 DAY 3: CART + ORDER TESTS');
  console.log('='.repeat(55));

  // Login
  console.log('\n📋 Setup');
  const cRes = await req('POST', '/api/auth/login', {
    email: 'jean@test.com', password: 'Test123456',
  });
  customerToken = cRes.body.data.token;

  const vRes = await req('POST', '/api/auth/login', {
    email: 'mami@test.com', password: 'Vendor123',
  });
  vendorToken = vRes.body.data.token;
  console.log('  ✅ Users logged in');

  // Get a product ID
  const prodRes = await req('GET', '/api/products?limit=3');
  const products = prodRes.body.data.products;
  const p1 = products[0];
  const p2 = products[1];

  // ---- CART ----
  console.log('\n📋 Cart');

  await test('GET /cart starts empty', async () => {
    const res = await req('GET', '/api/cart', null, customerToken);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.body.data.itemCount === 0, 'Expected empty cart');
  });

  let cartItemId = '';
  await test('POST /cart/items adds product', async () => {
    const res = await req('POST', '/api/cart/items', {
      product: p1._id, quantity: 2,
    }, customerToken);
    assert(res.status === 201, `Expected 201, got ${res.status}`);
    assert(res.body.data.itemCount === 1, 'Expected 1 item');
    cartItemId = res.body.data.items[0]._id;
  });

  await test('POST /cart/items adds second product', async () => {
    const res = await req('POST', '/api/cart/items', {
      product: p2._id, quantity: 1,
    }, customerToken);
    assert(res.status === 201, `Expected 201, got ${res.status}`);
    assert(res.body.data.itemCount === 2, 'Expected 2 items');
  });

  await test('POST /cart/items increments existing', async () => {
    const res = await req('POST', '/api/cart/items', {
      product: p1._id, quantity: 1,
    }, customerToken);
    assert(res.status === 201, `Expected 201, got ${res.status}`);
    const item = res.body.data.items.find(
      (i) => i.product._id === p1._id || i.product === p1._id
    );
    assert(item.quantity === 3, `Expected qty 3, got ${item.quantity}`);
  });

  await test('PUT /cart/items/:id updates quantity', async () => {
    const res = await req('PUT', `/api/cart/items/${cartItemId}`, {
      quantity: 1,
    }, customerToken);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  await test('GET /cart shows totals', async () => {
    const res = await req('GET', '/api/cart', null, customerToken);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.body.data.subtotal > 0, 'Expected subtotal');
    assert(res.body.data.deliveryFee === 1500, 'Expected 1500 XAF delivery');
    assert(res.body.data.total > 0, 'Expected total');
  });

  await test('Cart requires auth', async () => {
    const res = await req('GET', '/api/cart');
    assert(res.status === 401, `Expected 401, got ${res.status}`);
  });

  // ---- ORDERS ----
  console.log('\n📋 Orders');

  let orderId = '';
  await test('POST /orders creates from cart', async () => {
    const res = await req('POST', '/api/orders', {
      deliveryMethod: 'home_delivery',
      shipping: {
        fullName: 'Jean-Marc Ebongue',
        street: 'Rue de la Joie',
        quarter: 'Bonapriso',
        city: 'Douala',
        region: 'Littoral',
        phone: '237670000000',
      },
      paymentMethod: 'mtn_momo',
    }, customerToken);
    assert(res.status === 201, `Expected 201, got ${res.status}`);
    assert(res.body.data.orderId.startsWith('AFR-'), 'Expected AFR- prefix');
    assert(res.body.data.status === 'placed', 'Expected placed status');
    assert(res.body.data.paymentMethod === 'mtn_momo', 'Wrong payment');
    assert(res.body.data.deliveryFee === 1500, 'Expected delivery fee');
    orderId = res.body.data._id;
  });

  await test('Cart is empty after order', async () => {
    const res = await req('GET', '/api/cart', null, customerToken);
    assert(res.body.data.itemCount === 0, 'Cart should be empty');
  });

  await test('POST /orders fails on empty cart', async () => {
    const res = await req('POST', '/api/orders', {
      deliveryMethod: 'home_delivery',
      shipping: {
        fullName: 'Test', city: 'Douala', region: 'Littoral', phone: '237',
      },
      paymentMethod: 'mtn_momo',
    }, customerToken);
    assert(res.status === 400, `Expected 400, got ${res.status}`);
  });

  await test('GET /orders returns my orders', async () => {
    const res = await req('GET', '/api/orders', null, customerToken);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.body.data.orders.length >= 1, 'Expected orders');
    assert(res.body.data.pagination, 'Expected pagination');
  });

  await test('GET /orders/:id returns single order', async () => {
    const res = await req('GET', `/api/orders/${orderId}`, null, customerToken);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.body.data.items.length > 0, 'Expected order items');
  });

  await test('PUT /orders/:id/status updates (vendor)', async () => {
    const res = await req('PUT', `/api/orders/${orderId}/status`, {
      status: 'processing',
    }, vendorToken);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.body.data.status === 'processing', 'Not updated');
  });

  await test('PUT /orders/:id/cancel cancels order', async () => {
    const res = await req('PUT', `/api/orders/${orderId}/cancel`,
      null, customerToken);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.body.data.status === 'cancelled', 'Not cancelled');
  });

  await test('Cannot cancel delivered order', async () => {
    // Try cancelling again (already cancelled)
    const res = await req('PUT', `/api/orders/${orderId}/cancel`,
      null, customerToken);
    assert(res.status === 400, `Expected 400, got ${res.status}`);
  });

  // Summary
  console.log('\n' + '='.repeat(55));
  console.log(`📊 Results: ${testsPassed} passed, ${testsFailed} failed`);
  console.log('='.repeat(55));
  if (testsFailed > 0) process.exit(1);
};

run().catch((err) => {
  console.error('\n💥 Crashed:', err.message);
  process.exit(1);
});
