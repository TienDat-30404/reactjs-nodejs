// // const redis = require('redis');
// import redis from 'redis'
// // Cấu hình kết nối Redis
// const client = redis.createClient({
//     host: 'hredis', // Địa chỉ Redis server (sử dụng mặc định localhost)
//     port: 6379, // Cổng Redis (mặc định là 6379)
// });

// // Kết nối Redis và xử lý lỗi
// (async () => {
//     try {
//         await client.connect();
//         console.log('Redis client connected');
//     } catch (err) {
//         console.error('Redis connection error:', err);
//     }
// })();


// export default client;



import Redis from "ioredis";

const redis = new Redis({
  host: "redis",
  port: 6379,
  retryStrategy: (times) => Math.min(times * 50, 2000), 
});
console.log("redisssss", redis)

redis.on("connect", () => console.log("Connected to Redis"));
redis.on("error", (err) => console.error("Redis error:", err));

export default redis;
