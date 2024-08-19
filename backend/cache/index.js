import { RedisMemoryServer } from 'redis-memory-server';
import { createClient } from 'redis';
import { DEFAULT_TTL } from '../constants';

class RedisDB {
  constructor() {
    this.client = null;
  }

  async init() {
    const redisServer = new RedisMemoryServer();
    const [host, port] = await Promise.all([
      redisServer.getHost(),
      redisServer.getPort(),
    ]);

    this.client = await createClient({
      url: `redis://${host}:${port}`,
    })
      .on('error', (err) => console.log('Redis Client Error', err))
      .connect();
  }

  async set(key, value, ttl = DEFAULT_TTL) {
    await this.client.set(key, value, {
      EX: ttl,
    });
  }

  get(key) {
    return this.client.get(key);
  }

  async del(key) {
    await this.client.del(key);
  }
}

export default new RedisDB();
