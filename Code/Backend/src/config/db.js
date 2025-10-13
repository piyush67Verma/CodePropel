const mongoose = require("mongoose");

async function main(){
    await mongoose.connect(process.env.MONGO_CONNECT_STRING, {
  serverSelectionTimeoutMS: 30000, // 30 seconds
  socketTimeoutMS: 45000, // 45 seconds
  maxPoolSize: 10,
  retryWrites: true,
  w: 'majority'
});
    console.log("MongoDB connected");
}

module.exports = main;