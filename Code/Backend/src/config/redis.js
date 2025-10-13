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
        tls: true, // Important for cloud Redis
        reconnectStrategy: (retries) => {
            return Math.min(retries * 100, 3000);
        }
    }
});

// Event listeners for debugging
redisClient.on('connect', () => console.log('Redis: Connecting...'));
redisClient.on('ready', () => console.log('Redis: Ready'));
redisClient.on('error', (err) => console.error('Redis Error:', err));
redisClient.on('end', () => console.log('Redis: Disconnected'));
redisClient.on('reconnecting', () => console.log('Redis: Reconnecting...'));

// Don't auto-connect here, let the main app handle connection
// redisClient.connect().catch(console.error);

module.exports = redisClient;