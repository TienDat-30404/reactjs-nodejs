// const redis = require('redis');
import redis from 'redis'
// Cấu hình kết nối Redis
const client = redis.createClient({
    host: 'host.docker.internal', // Địa chỉ Redis server (sử dụng mặc định localhost)
    port: 6379, // Cổng Redis (mặc định là 6379)
});

// Kết nối Redis và xử lý lỗi
(async () => {
    try {
        await client.connect();
        console.log('Redis client connected');
    } catch (err) {
        console.error('Redis connection error:', err);
    }
})();


export default client;
