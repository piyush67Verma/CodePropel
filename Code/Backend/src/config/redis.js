// const redis = require('redis');

// const redisClient = redis.createClient({
//     username: 'default',
//     password: process.env.REDIS_PASSWORD,
//     socket: {
//         host: 'redis-19391.crce182.ap-south-1-1.ec2.redns.redis-cloud.com',
//         port: 19391
//     }
// })


// module.exports = redisClient;
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

// Add comprehensive event listeners
redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
});

redisClient.on('connect', () => {
    console.log('Redis: Attempting to connect...');
});

redisClient.on('ready', () => {
    console.log('Redis: Client ready and connected');
});

redisClient.on('end', () => {
    console.log('Redis: Connection closed');
});

redisClient.on('reconnecting', () => {
    console.log('Redis: Reconnecting...');
});

// Connect with detailed error handling
redisClient.connect()
    .then(() => {
        console.log('Redis: Successfully connected');
        console.log('Redis Host:', 'redis-19391.crce182.ap-south-1-1.ec2.redns.redis-cloud.com');
    })
    .catch((err) => {
        console.error('Redis: Connection failed:', err);
        console.log('REDIS_PASSWORD exists:', !!process.env.REDIS_PASSWORD);
    });

module.exports = redisClient;