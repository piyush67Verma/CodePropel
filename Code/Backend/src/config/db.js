const mongoose = require("mongoose");

async function main(){
    await mongoose.connect(process.env.MONGO_CONNECT_STRING);
    console.log("MongoDB connected");
}

main().catch(err => console.log(err));

module.exports = main;