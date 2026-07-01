process.env.NODE_ENV = 'test';
const { req, assert, startServers, stopServers } = require('./helper');

async function runE2E() {
  console.log('\n🧪 STARTING END-TO-END INTEGRATION TEST');
  console.log('='.repeat(50));
  const s = await startServers();
  try {
    // 1. Register and Login
    const vEmail = `v1_${Date.now()}@t.com`;
    const cEmail = `c1_${Date.now()}@t.com`;
    const vPass = 'Vendor123';
    const cPass = 'Customer123';
    await req('POST', '/api/auth/register', { name: 'V1', email: vEmail, password: vPass, role: 'vendor', phone: '237670000001' });
    await req('POST', '/api/auth/register', { name: 'C1', email: cEmail, password: cPass, phone: '237670000002' });
    const vt = await s.loginAs(vEmail, vPass);
    const ct = await s.loginAs(cEmail, cPass);
    const at = await s.loginAs('admin@hypermarket.cm', 'Admin123456'); // Seeded admin

    // 2. Fetch categories & Vendor creates a product
    const catsRes = await req('GET', '/api/categories');
    const catId = catsRes.body.data[0]._id;
    const pName = 'E2E Tomato ' + Date.now();
    const prodRes = await req('POST', '/api/products', { name: pName, price: 1000, category: catId, stock: 10, unit: 'kg' }, vt);
    console.log('prodRes body:', JSON.stringify(prodRes.body));
    const prodId = prodRes.body.data._id;
    // 3. Customer browses product & adds to cart
    const browseRes = await req('GET', `/api/products/${prodId}`);
    assert(browseRes.body.data.name === pName, 'Browse failed');
    await req('POST', '/api/cart/items', { product: prodId, quantity: 2 }, ct);

    // 4. Customer Checkout & Payment
    const checkoutRes = await req('POST', '/api/orders', { deliveryMethod: 'home_delivery', shipping: { fullName: 'C1', city: 'Douala', region: 'Littoral', phone: '670000002' }, paymentMethod: 'mtn_momo' }, ct);
    console.log('checkoutRes body:', JSON.stringify(checkoutRes.body));
    const orderId = checkoutRes.body.data._id;
    const payRes = await req('POST', '/api/payment/initiate', { orderId, phone: '670000002' }, ct);
    const transId = payRes.body.data.transId;

    // 5. Poll payment status (Triggers Fapshi simulation success in helper)
    const pollRes = await req('GET', `/api/payment/status/${transId}`, null, ct);
    console.log('pollRes body:', JSON.stringify(pollRes.body));
    assert(pollRes.body.data.status === 'SUCCESSFUL', 'Payment status should be successful');

    // 6. Vendor Dashboard Stats & Order List
    const vStats = await req('GET', '/api/vendor/stats', null, vt);
    console.log('vStats body:', JSON.stringify(vStats.body));
    assert(vStats.body.data.totalSales >= 1, 'Vendor sale should register');
    const vOrders = await req('GET', '/api/vendor/orders', null, vt);
    console.log('vOrders body:', JSON.stringify(vOrders.body));
    const vOrderId = vOrders.body.data.orders[0]._id;

    // 7. Vendor fulfills order (placed -> processing -> ready -> delivered)
    await req('PUT', `/api/orders/${vOrderId}/status`, { status: 'processing' }, vt);
    await req('PUT', `/api/orders/${vOrderId}/status`, { status: 'ready' }, vt);
    await req('PUT', `/api/orders/${vOrderId}/status`, { status: 'delivered' }, vt);

    // 8. Admin statistics & user lists
    const aStats = await req('GET', '/api/admin/stats', null, at);
    assert(aStats.body.data.totalOrders >= 1, 'Admin orders count incorrect');
    const aUsers = await req('GET', '/api/admin/users', null, at);
    assert(aUsers.body.data.users.length >= 2, 'Admin user count incorrect');

    console.log('  ✅ PASS: End-To-End checkout and fulfillment flow completed successfully.');
    console.log('='.repeat(50));
  } catch (err) {
    console.log(`  ❌ FAIL: E2E Integration failed — ${err.message}`);
    process.exit(1);
  } finally {
    await stopServers(s);
  }
}

runE2E();
