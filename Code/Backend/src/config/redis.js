const redis = require('redis');

const redisClient = redis.createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: 'redis-19391.crce182.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 19391,
        tls: true
    }
});

redisClient.connect().catch(console.error); // Auto-connect when imported

module.exports = redisClient;