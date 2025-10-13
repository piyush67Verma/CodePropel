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
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

let isConnecting = false;
let isConnected = false;

const initializeConnection = async () => {
    if (isConnected || isConnecting) {
        return;
    }
    
    isConnecting = true;
    console.log("Initializing connections...");
    
    try {
        await Promise.all([redisClient.connect().catch(err => {
            console.log('Redis connection attempt:', err.message);
        }), main()]);
        
        isConnected = true;
        console.log("All connections established");
    } catch (error) {
        console.error("Connection initialization failed:", error);
    } finally {
        isConnecting = false;
    }
}

// Initialize connections once when app starts
initializeConnection();

// Remove the middleware that runs on every request
// app.use((req, res, next)=>{
//     if(!isConnected){
//         initializeConnection();
//     }
//     next();
// })

app.use('/auth', authRouter);
app.use('/problem', problemRouter);
app.use('/submission', submitRouter);
app.use('/ai', aiRouter);

app.get('/api/redis-status', async (req, res) => {
    try {
        console.log('Environment check:', {
            hasRedisPassword: !!process.env.REDIS_PASSWORD,
            redisHost: 'redis-19391.crce182.ap-south-1-1.ec2.redns.redis-cloud.com',
            redisPort: 19391
        });

        // Check if Redis is connected, if not try to connect
        if (!redisClient.isOpen) {
            try {
                await redisClient.connect();
            } catch (connectError) {
                console.log('Redis connection in endpoint failed:', connectError.message);
            }
        }

        // Test basic operations only if Redis is connected
        if (redisClient.isOpen) {
            await redisClient.set('test_key', 'Hello from Vercel!');
            const value = await redisClient.get('test_key');
            
            res.json({
                status: 'success',
                redisConnected: true,
                testValue: value,
            });
        } else {
            res.status(500).json({
                status: 'error',
                redisConnected: false,
                error: 'Redis not connected',
                hasPassword: !!process.env.REDIS_PASSWORD
            });
        }
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