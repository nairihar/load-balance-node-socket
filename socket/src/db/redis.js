import Redis from 'redis';
import Promise from 'bluebird';

Promise.promisifyAll(Redis.RedisClient.prototype);
Promise.promisifyAll(Redis.Multi.prototype);

const RedisClient = Redis.createClient(
  process.env.REDIS_PORT,
  process.env.REDIS_HOST
);

RedisClient.on('connect', () => {
  console.log(`Redis connected on ${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`);
});

RedisClient.on('ready', () => {
  console.log('Redis ready');
});

RedisClient.on('reconnecting', () => {
  console.log('Redis reconnecting');
});

RedisClient.on('error', err => {
  console.log('Redis errpr');
  console.error(err);
});

RedisClient.on('end', () => {
  console.log('Redis end');
});

export default RedisClient;
