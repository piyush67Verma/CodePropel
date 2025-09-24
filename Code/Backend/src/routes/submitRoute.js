const express = require('express');
const userMiddleware = require('../middleware/userMiddleware');
const {submitCode, runCode} = require('../middleware/submissionMiddleware');
const submitRouter = express.Router();

submitRouter.post('/submit/:id', userMiddleware, submitCode);

submitRouter.post('/run/:id', userMiddleware, runCode);

module.exports = submitRouter;