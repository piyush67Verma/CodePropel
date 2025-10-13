require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') })
const express = require('express');
const main = require('./config/db');
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/userAuth');
const problemRouter = require('./routes/problemRoute');
const redisClient = require('./config/redis');
const submitRouter = require('./routes/submitRoute');
const cors = require('cors');
const aiRouter = require('./routes/aiChatting');

const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use(express.json());
app.use(cookieParser());

// Let Redis and DB connect themselves when imported
// No manual connection initialization needed

app.use('/auth', authRouter);
app.use('/problem', problemRouter);
app.use('/submission', submitRouter);
app.use('/ai', aiRouter);

app.get('/api/redis-status', async (req, res) => {
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect();
        }

        await redisClient.set('test_key', 'Hello from Vercel!');
        const value = await redisClient.get('test_key');
        
        res.json({
            status: 'success',
            redisConnected: true,
            testValue: value,
        });
    } catch (error) {
        console.error('Redis test failed:', error);
        res.status(500).json({
            status: 'error',
            redisConnected: false,
            error: error.message,
            hasPassword: !!process.env.REDIS_PASSWORD
        });
    }
});

module.exports = app;