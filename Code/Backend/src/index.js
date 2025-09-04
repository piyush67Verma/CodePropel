require('dotenv').config();
const express = require('express');
const main = require('./config/db');
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/userAuth');
const redisClient = require('./config/redis');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRouter);



const initializeConnection = async () => {

    await Promise.all([redisClient.connect(), main()]);
    console.log("DB connected");


    app.listen(process.env.PORT, () => {
        console.log("Application Server listening at " + process.env.PORT);
    })
}

initializeConnection();


