const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20
    }, 
    lastName:{
        type:String,
        minLength:3,
        maxLength:20
    }, 
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        immutable:true
    }, 
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:6,
        max:80,
    }, 
    role:{
        type:String,
        enum:['admin', 'user'], 
        default:'user'
    }, 
    problemSoved:{
        type:[String]
    }
}, {timestamps:true});

const User = mongoose.model('users', userSchema);

module.exports = User;