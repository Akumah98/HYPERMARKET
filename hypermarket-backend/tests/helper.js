const http = require('http');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const BASE = 'http://localhost:5000';

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

const assert = (c, m) => { if (!c) throw new Error(m); };

const startServers = async () => {
  const transactions = new Map();
  const fapshiServer = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    if (request.url === '/direct-pay' && request.method === 'POST') {
      let body = '';
      request.on('data', (c) => (body += c));
      request.on('end', () => {
        try {
          const payload = JSON.parse(body);
          const transId = 'tx' + Math.random().toString(36).substring(2, 10);
          transactions.set(transId, {
            externalId: payload.externalId,
            amount: payload.amount,
          });
          response.end(JSON.stringify({ statusCode: 200, transId }));
        } catch {
          response.end(JSON.stringify({ statusCode: 400, message: 'Invalid payload' }));
        }
      });
    } else if (request.url.startsWith('/payment-status/') && request.method === 'GET') {
      const transId = request.url.split('/').pop();
      const tx = transactions.get(transId) || { externalId: 'mockorder1', amount: 5000 };
      response.end(JSON.stringify({
        statusCode: 200,
        status: 'SUCCESSFUL',
        externalId: tx.externalId,
        amount: tx.amount,
      }));
    } else {
      response.end(JSON.stringify({ statusCode: 404, message: 'Not found' }));
    }
  });
  await new Promise((r) => fapshiServer.listen(5001, r));

  process.env.FAPSHI_BASE_URL = 'http://localhost:5001';

  const connectDB = require('../src/config/db');
  await connectDB();

  const app = require('../src/app');
  const appServer = http.createServer(app);
  await new Promise((r) => appServer.listen(5000, r));

  const loginAs = async (email, password) => {
    const res = await req('POST', '/api/auth/login', { email, password });
    return res.body.data.token;
  };

  return { fapshiServer, appServer, loginAs };
};

const stopServers = async (servers) => {
  const mongoose = require('mongoose');
  await Promise.all([
    new Promise((r) => servers.fapshiServer.close(r)),
    new Promise((r) => servers.appServer.close(r)),
    mongoose.connection.close(),
  ]);
};

module.exports = { req, assert, startServers, stopServers };
