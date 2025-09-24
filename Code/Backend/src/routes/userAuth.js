const express = require('express');
const authRouter = express.Router();
const { register, login, logout, getProfile, adminRegister, deleteProfile} = require("../controllers/AuthControllers");
const userMiddleware = require('../middleware/userMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
authRouter.post('/register', register)

authRouter.post('/login', login)

authRouter.post('/logout', userMiddleware, logout)

authRouter.get('/getProfile', getProfile);

authRouter.post('/admin/register', adminMiddleware, adminRegister);

authRouter.delete('/profile/delete', userMiddleware, deleteProfile);

module.exports = authRouter; 