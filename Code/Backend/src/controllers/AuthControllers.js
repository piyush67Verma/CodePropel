const User = require('../models/user');
const validateUser = require('../utils/userValidation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const redisClient = require('../config/redis');
const register = async (req, res, next) => {
    try {
        validateUser(req.body);
        //hash the password before saving it into db
        let { password } = req.body;
        const hashString = await bcrypt.hash(password, 10);
        req.body.password = hashString;
        req.body.role = 'user';
        const user = await User.create(req.body);
        const { _id, emailId } = user;
        const token = jwt.sign({ _id, emailId, role:'user' }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 });
        res.cookie('token', token, { maxAge: 60 * 60 * 1000 });
        res.status(201).send("User registered successfully");
    }
    catch (err) {
        res.status(400).send("Error: " + err.message);
    }
}

const login = async (req, res, next) => {
    try {
        const { emailId, password } = req.body;
        if (!emailId || !password) {
            throw new Error("Invalid Credentials");
        }
        const user = await User.findOne({ emailId });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid Credentials");
        }
        const token = jwt.sign({ _id: user._id, emailId, role:user.role}, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 });
        res.cookie('token', token, { maxAge: 60 * 60 * 1000 });
        res.status(200).send("User logged in successfully");
    }
    catch (err) {
        res.status(401).send("Error: " + err.message);
    }
}

const logout = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        const payload = jwt.decode(token);

        // put the token in blocklist in  redis db and keep it there 
        // till expiration of token 
        await redisClient.set(`token:${token}`, "Blocked");
        await redisClient.expireAt(`token:${token}`, payload.exp);

        // expire the cookie
        res.cookie('token', null, { expires: new Date(Date.now()) })
        res.status(200).send("Logged out successfully");
    }
    catch (err) {
        res.status(500).send("Error: "+err.message);
    }

}


const adminRegister = async (req, res)=>{
    try {
        validateUser(req.body);
        //hash the password before saving it into db
        let { password } = req.body;
        const hashString = await bcrypt.hash(password, 10);
        req.body.password = hashString;
        req.body.role = 'admin';
        const user = await User.create(req.body);
        const { _id, emailId } = user;
        const token = jwt.sign({ _id, emailId, role:'user' }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 });
        res.cookie('token', token, { maxAge: 60 * 60 * 1000 });
        res.status(201).send("User registered successfully");
    }
    catch (err) {
        res.status(400).send("Error: " + err.message);
    }
}

const getProfile = async (req, res, next) => {
    // try{

    // }
    // catch(err){

    // }

}

module.exports = { register, login, logout, getProfile, adminRegister};