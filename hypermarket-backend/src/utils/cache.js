'use strict';

const redis = require('redis');
const cacheStore = new Map();
let redisClient = null;
let isRedisReady = false;

if (process.env.REDIS_URL) {
  redisClient = redis.createClient({ url: process.env.REDIS_URL });
  redisClient.on('error', (err) => {
    console.error('[Cache] Redis Error:', err.message);
    isRedisReady = false;
  });
  redisClient.on('ready', () => {
    console.log('[Cache] Redis Connected & Ready.');
    isRedisReady = true;
  });
  redisClient.connect().catch((err) => {
    console.error('[Cache] Redis Connection Failed:', err.message);
    isRedisReady = false;
  });
}

const getInMemory = (key) => {
  const entry = cacheStore.get(key);
  if (!entry) return null;
  if (entry.expiry && Date.now() > entry.expiry) {
    cacheStore.delete(key);
    return null;
  }
  return entry.value;
};

const setInMemory = (key, value, ttlSeconds) => {
  const expiry = ttlSeconds > 0 ? Date.now() + ttlSeconds * 1000 : null;
  cacheStore.set(key, { value, expiry });
};

const cache = {
  get: async (key) => {
    if (isRedisReady && redisClient) {
      try {
        const val = await redisClient.get(key);
        return val ? JSON.parse(val) : null;
      } catch (err) {
        console.error('[Cache] Redis GET failed, fallback to Memory:', err.message);
      }
    }
    return getInMemory(key);
  },

  set: async (key, value, ttlSeconds = 300) => {
    if (isRedisReady && redisClient) {
      try {
        await redisClient.set(key, JSON.stringify(value), { EX: ttlSeconds });
        return;
      } catch (err) {
        console.error('[Cache] Redis SET failed, fallback to Memory:', err.message);
      }
    }
    setInMemory(key, value, ttlSeconds);
  },

  del: async (key) => {
    if (isRedisReady && redisClient) {
      try {
        await redisClient.del(key);
      } catch (err) {
        console.error('[Cache] Redis DEL failed:', err.message);
      }
    }
    cacheStore.delete(key);
  },

  invalidatePattern: async (pattern) => {
    if (isRedisReady && redisClient) {
      try {
        const keys = await redisClient.keys(pattern);
        if (keys && keys.length > 0) {
          await redisClient.del(keys);
        }
      } catch (err) {
        console.error('[Cache] Redis Pattern Invalidation failed:', err.message);
      }
    }
    const regex = new RegExp(pattern.replace(/\*/g, '.*'));
    for (const key of cacheStore.keys()) {
      if (regex.test(key)) {
        cacheStore.delete(key);
      }
    }
  }
};

module.exports = cache;
