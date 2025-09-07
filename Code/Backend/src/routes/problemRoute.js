//CRUD for problems 

const express = require('express');
const adminMiddleware = require('../middleware/adminMiddleware');
const userMiddleware = require('../middleware/userMiddleware');
const { createProblem, updateProblem, deleteProblem, getProblemById, getAllProblems, getAllSolvedProblems} = require("../controllers/ProblemControllers")
const problemRouter = express.Router();

problemRouter.post('/create', adminMiddleware, createProblem);
problemRouter.put('/update/:id', adminMiddleware, updateProblem);
problemRouter.delete('/delete/:id',adminMiddleware, deleteProblem);


problemRouter.get('/problemById/:id', userMiddleware, getProblemById);
problemRouter.get('/allProblems', userMiddleware,  getAllProblems);
problemRouter.get('/problemsSolvedByUser/:id', userMiddleware , getAllSolvedProblems);



module.exports = problemRouter;