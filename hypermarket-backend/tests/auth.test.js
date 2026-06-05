/**
 * Auth API Test Script
 * Tests all Day 1 auth endpoints sequentially
 */
const http = require('http');

const BASE_URL = 'http://localhost:5000';
let authToken = '';
let testsPassed = 0;
let testsFailed = 0;

const request = (method, path, body = null) => {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method,
      headers: { 'Content-Type': 'application/json' },
    };

    if (authToken) {
      options.headers['Authorization'] = `Bearer ${authToken}`;
    }

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

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const runTests = async () => {
  console.log('\n🧪 HYPERMARKET AUTH API TESTS');
  console.log('='.repeat(50));

  // 1. Health Check
  console.log('\n📋 Health Check');
  await test('GET /api/health returns 200', async () => {
    const res = await request('GET', '/api/health');
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.body.success === true, 'Expected success: true');
  });

  // 2. Registration
  console.log('\n📋 Registration');
  await test('Register customer succeeds', async () => {
    const res = await request('POST', '/api/auth/register', {
      name: 'Jean-Marc Ebongue',
      email: 'jean@test.com',
      password: 'Test123456',
      phone: '237670000000',
    });
    assert(res.status === 201, `Expected 201, got ${res.status}`);
    assert(res.body.data.token, 'Expected token in response');
    assert(res.body.data.user.role === 'customer', 'Expected customer role');
  });

  await test('Register vendor succeeds', async () => {
    const res = await request('POST', '/api/auth/register', {
      name: 'Mami Wata Organics',
      email: 'mami@test.com',
      password: 'Vendor123',
      role: 'vendor',
      phone: '237680000000',
    });
    assert(res.status === 201, `Expected 201, got ${res.status}`);
    assert(res.body.data.user.role === 'vendor', 'Expected vendor role');
  });

  await test('Duplicate email returns 409', async () => {
    const res = await request('POST', '/api/auth/register', {
      name: 'Duplicate User',
      email: 'jean@test.com',
      password: 'Test123456',
    });
    assert(res.status === 409, `Expected 409, got ${res.status}`);
  });

  await test('Invalid input returns 400', async () => {
    const res = await request('POST', '/api/auth/register', {
      name: '',
      email: 'bad-email',
      password: '12',
    });
    assert(res.status === 400, `Expected 400, got ${res.status}`);
  });

  // 3. Login
  console.log('\n📋 Login');
  await test('Login with valid credentials succeeds', async () => {
    const res = await request('POST', '/api/auth/login', {
      email: 'jean@test.com',
      password: 'Test123456',
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.body.data.token, 'Expected token');
    authToken = res.body.data.token;
  });

  await test('Login with wrong password returns 401', async () => {
    const res = await request('POST', '/api/auth/login', {
      email: 'jean@test.com',
      password: 'WrongPassword',
    });
    assert(res.status === 401, `Expected 401, got ${res.status}`);
  });

  await test('Login with non-existent email returns 401', async () => {
    const res = await request('POST', '/api/auth/login', {
      email: 'nobody@test.com',
      password: 'Test123456',
    });
    assert(res.status === 401, `Expected 401, got ${res.status}`);
  });

  // 4. Protected Route
  console.log('\n📋 Protected Routes');
  await test('GET /api/auth/me with token returns profile', async () => {
    const res = await request('GET', '/api/auth/me');
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.body.data.email === 'jean@test.com', 'Expected correct email');
    assert(res.body.data.name === 'Jean-Marc Ebongue', 'Expected correct name');
  });

  const savedToken = authToken;
  authToken = '';
  await test('GET /api/auth/me without token returns 401', async () => {
    const res = await request('GET', '/api/auth/me');
    assert(res.status === 401, `Expected 401, got ${res.status}`);
  });

  authToken = 'invalid.token.here';
  await test('GET /api/auth/me with bad token returns 401', async () => {
    const res = await request('GET', '/api/auth/me');
    assert(res.status === 401, `Expected 401, got ${res.status}`);
  });
  authToken = savedToken;

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log(`📊 Results: ${testsPassed} passed, ${testsFailed} failed`);
  console.log('='.repeat(50));

  if (testsFailed > 0) {
    process.exit(1);
  }
};

runTests().catch((err) => {
  console.error('\n💥 Test runner crashed:', err.message);
  process.exit(1);
});
