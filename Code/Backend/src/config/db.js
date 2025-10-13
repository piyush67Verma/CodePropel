const mongoose = require("mongoose");

async function main(){
    await mongoose.connect(process.env.MONGO_CONNECT_STRING);
    console.log("MongoDB connected");
}

module.exports = main;