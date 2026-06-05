const { req, assert, startServers, stopServers } = require('./helper');
const mongoose = require('mongoose');

let servers;
let customerToken;
let vendorToken;
let adminToken;

const test = async (name, fn) => {
  try {
    await fn();
    console.log(`  ✅ PASS: ${name}`);
  } catch (err) {
    console.log(`  ❌ FAIL: ${name} — ${err.message}`);
    if (servers) await stopServers(servers);
    await mongoose.disconnect();
    process.exit(1);
  }
};

const run = async () => {
  console.log('\n🧪 DAY 5: VENDOR & ADMIN APIS + NOTIFICATIONS TESTS');
  console.log('='.repeat(55));

  servers = await startServers();
  customerToken = await servers.loginAs('jean@test.com', 'Test123456');
  vendorToken = await servers.loginAs('mami@test.com', 'Vendor123');
  adminToken = await servers.loginAs('admin@hypermarket.cm', 'Admin123456');

  // 1. Push notification token registration
  await test('POST /api/notifications/register saves push token', async () => {
    const res = await req('POST', '/api/notifications/register', {
      token: 'ExponentPushToken[jean-token]',
    }, customerToken);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  // 2. Vendor endpoints
  await test('GET /api/vendor/products lists vendor products', async () => {
    const res = await req('GET', '/api/vendor/products', null, vendorToken);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.body.data.products.length >= 0, 'Expected products list');
  });

  await test('GET /api/vendor/orders lists vendor orders', async () => {
    const res = await req('GET', '/api/vendor/orders', null, vendorToken);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.body.data.orders.length >= 0, 'Expected orders list');
  });

  await test('GET /api/vendor/stats returns vendor sales metrics', async () => {
    const res = await req('GET', '/api/vendor/stats', null, vendorToken);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert('totalRevenue' in res.body.data, 'Expected totalRevenue in stats');
  });

  // 3. Admin endpoints
  await test('GET /api/admin/users lists all users for admin', async () => {
    const res = await req('GET', '/api/admin/users', null, adminToken);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.body.data.users.length > 0, 'Expected users list');
  });

  await test('GET /api/admin/orders lists all orders for admin', async () => {
    const res = await req('GET', '/api/admin/orders', null, adminToken);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  await test('GET /api/admin/stats returns platform reports', async () => {
    const res = await req('GET', '/api/admin/stats', null, adminToken);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert('totalRevenue' in res.body.data, 'Expected totalRevenue in admin stats');
  });

  await test('GET /api/admin/stats blocked for customers', async () => {
    const res = await req('GET', '/api/admin/stats', null, customerToken);
    assert(res.status === 403, `Expected 403, got ${res.status}`);
  });

  await stopServers(servers);
  await mongoose.disconnect();
  console.log('\n📊 Day 5 Tests completed successfully!');
};

run().catch(async (err) => {
  console.error('Test crashed:', err);
  if (servers) await stopServers(servers);
  await mongoose.disconnect();
  process.exit(1);
});
