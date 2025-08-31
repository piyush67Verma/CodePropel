require('dotenv').config();
const express = require('express');
const main = require('./config/db');
const cookieParser = require('cookie-parser')
const app = express();

app.use(express.json());
app.use(cookieParser());


main()
.then(()=>{
    console.log("Connected to MongoDB successfully");
    app.listen(process.env.PORT, ()=>{
    console.log("server listening at "+ process.env.PORT);
})
})
.catch((err)=>{
    console.error(err.message);
})


