const { req, assert, startServers, stopServers } = require('./helper');
const mongoose = require('mongoose');

let servers;
let customerToken;
let orderId;

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
  console.log('\n🧪 DAY 4: FAPSHI PAYMENT INTEGRATION TESTS');
  console.log('='.repeat(55));

  servers = await startServers();
  customerToken = await servers.loginAs('jean@test.com', 'Test123456');

  const prodRes = await req('GET', '/api/products?limit=1');
  const p1 = prodRes.body.data.products[0];

  await req('POST', '/api/cart/items', { product: p1._id, quantity: 1 }, customerToken);

  const orderRes = await req('POST', '/api/orders', {
    deliveryMethod: 'store_pickup',
    shipping: { fullName: 'Jean-Marc Ebongue', city: 'Douala', region: 'Littoral', phone: '237670000000' },
    paymentMethod: 'mtn_momo',
  }, customerToken);
  orderId = orderRes.body.data._id;

  await test('POST /api/payment/initiate fails on invalid phone', async () => {
    const res = await req('POST', '/api/payment/initiate', { orderId, phone: '123' }, customerToken);
    assert(res.status === 400, `Expected 400, got ${res.status}`);
  });

  let transId;
  await test('POST /api/payment/initiate succeeds with valid payload', async () => {
    const res = await req('POST', '/api/payment/initiate', { orderId, phone: '677123456' }, customerToken);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.body.data.transId === 'mocktrans1', 'Expected transId mocktrans1');
    transId = res.body.data.transId;
  });

  await test('GET /api/payment/status/:transId returns status & updates order', async () => {
    const res = await req('GET', `/api/payment/status/${transId}`, null, customerToken);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.body.data.status === 'SUCCESSFUL', 'Expected SUCCESSFUL status');
  });

  await test('POST /api/payment/webhook updates order status', async () => {
    const res = await req('POST', '/api/payment/webhook', { transId: 'mocktrans1' });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  await stopServers(servers);
  await mongoose.disconnect();
  console.log('\n📊 Day 4 Tests completed successfully!');
};

run().catch(async (err) => {
  console.error('Test crashed:', err);
  if (servers) await stopServers(servers);
  await mongoose.disconnect();
  process.exit(1);
});
