//CRUD for problems 

const express = require('express');
const adminMiddleware = require('../middleware/adminMiddleware');
const problemRouter = express.Router();

problemRouter.post('/create', adminMiddleware, createProblem);
problemRouter.patch('/:id', updateProblem);
problemRouter.delete('/:id', deleteProblem);


problemRouter.get('/:id', getProblemById);
problemRouter.get('/all', getAllProblems);
problemRouter.get('/solved/:id', getAllSolvedProblems);



module.exports = problemRouter;