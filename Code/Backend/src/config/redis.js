const redis = require('redis');

const redisClient = redis.createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: 'redis-15761.c265.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 15761
    }
})


module.exports = redisClient;
