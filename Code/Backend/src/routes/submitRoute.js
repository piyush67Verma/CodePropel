const express = require('express');
const userMiddleware = require('../middleware/userMiddleware');
const submitCode = require('../middleware/submissionMiddleware');
const submitRouter = express.Router();

submitRouter.post('/submit/:id', userMiddleware, submitCode);

module.exports = submitRouter;