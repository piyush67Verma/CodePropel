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

let isConnected = false;
const initializeConnection = async () => {

    await Promise.all([redisClient.connect(), main()]);
    isConnected = true;
    console.log("DB connected");
}

app.use((req, res, next)=>{
    if(!isConnected){
        initializeConnection();
    }
    next();
})



app.use('/auth', authRouter);
app.use('/problem', problemRouter);
app.use('/submission', submitRouter);
app.use('/ai', aiRouter);


module.exports = app;




