const { getLanguageId, submitBatch, submitTokens } = require('../utils/problemUtility');
const Problem = require('../models/problems');

const ErrorCase = {
    4: "Wrong Answer",
    5: "Time Limit Exceeded",
    6: "Compilation Error",
    7: "Runtime Error (SIGSEGV)",
    8: "Runtime Error (SIGXFSZ)",
    9: "Runtime Error (SIGFPE)",
    10: "Runtime Error (SIGABRT)",
    11: "Runtime Error (NZEC)",
    12: "Runtime Error (Other)",
    13: "Internal Error",
    14: "Exec Format Error"
}

const createProblem = async (req, res) => {
    const { title, description, difficulty,
        tags, visibleTestCases, hiddenTestCases,
        startCode, referenceSolution
    } = req.body;

    try {
        for (let { language, completeCode } of referenceSolution) {
            const languageId = getLanguageId(language);
            const submissions = visibleTestCases.map((testcase) => {
                return {
                    source_code: completeCode,
                    language_id: languageId,
                    stdin: testcase.input,
                    expected_output: testcase.output
                }
            });

            const submitResult = await submitBatch(submissions);
            // submitResult look like this 
            /*
                [
                    {
                        "token":"......."
                    }, 
                    {
                        "token":"......."
                    }
                ]
            
            */
            const arrOfTokens = submitResult.map((obj) => {
                return obj.token;
            })

            const testResult = await submitTokens(arrOfTokens);
            for (let test of testResult) {
                if (test.status_id != 3) {
                    return res.status(400).send("Error: " + ErrorCase[testcase.status_id])
                }
            }
        }

        // store it in the db once all the sample testcases 
        // excuted for all the languages

        const problem = await Problem.create({
            ...req.body,
            problemCreator: req.result._id
        })

        res.status(201).send("Problem Saved Successfully");
    }
    catch (err) {
        res.status(500).send("Error: " + err.message);
    }
}

const updateProblem = async (req, res) => {
    const { id } = req.params;
    const { title, description, difficulty,
        tags, visibleTestCases, hiddenTestCases,
        startCode, referenceSolution
    } = req.body;

    try {

        if (!id) {
            return res.status(400).send("Missing Id field");
        }

        const dsaProblem = await Problem.findById(id);
        if (!dsaProblem) {
            return res.status(400).send("No such Id exist for problem");
        }
        for (let { language, completeCode } of referenceSolution) {
            const languageId = getLanguageId(language);
            const submissions = visibleTestCases.map((testcase) => {
                return {
                    source_code: completeCode,
                    language_id: languageId,
                    stdin: testcase.input,
                    expected_output: testcase.output
                }
            });

            const submitResult = await submitBatch(submissions);
            // submitResult look like this 
            /*
                [
                    {
                        "token":"......."
                    }, 
                    {
                        "token":"......."
                    }
                ]
            
            */
            const arrOfTokens = submitResult.map((obj) => {
                return obj.token;
            })

            const testResult = await submitTokens(arrOfTokens);
            for (let test of testResult) {
                if (test.status_id != 3) {
                    return res.status(400).send("Error: " + ErrorCase[testcase.status_id])
                }
            }
        }

        const updatedProblem = await Problem.findByIdAndUpdate(id, { ...req.body }, { runValidators: true, new: true });

        res.status(200).send(updateProblem);
    }
    catch (err) {
        res.status(500).send("Error: " + err.message);
    }

}

const deleteProblem = async (req, res) => {
    const { id } = req.params;
    try {

        if (!id) {
            return res.status(400).send("Missing Id field");
        }

        const deletedProblem = await Problem.findByIdAndDelete(id);
        if (!deleteProblem) {
            return res.status(400).send("No such Id exist for problem");
        }
        res.status(200).send("Problem deleted successfully");
    }
    catch (err) {
        res.status(500).send("Error: " + err.message);
    }
}

const getProblemById = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).send("Missing Id field");
        }

        const dsaProblem = await Problem.findById(id);
        if (!dsaProblem) {
            return res.status(400).send("No such Id exist for problem");
        }
        res.status(200).send(dsaProblem);
    }
    catch (err) {
        res.status(500).send("Error: "+ err.message);
    }
}


const getAllProblems = async (req, res) => {
    try{
        const allProblems = await Problem.find({});
        if(allProblems.length==0){
           return res.send(404).send("No problem in the DB");
        }
        res.status(200).send(allProblems);
    }
    catch(err){
        res.staus(500).send("Error: "+err.message);
    }
}

const getAllSolvedProblems = async (req, res) => {

}

module.exports = { createProblem, updateProblem, deleteProblem, getProblemById, getAllProblems, getAllSolvedProblems };


/*

referenceSolution = [
{
    language: "C++", 
    completeCode:"C++ Code"
},
{
    language: "Java", 
    completeCode:"Java Code"
},
{
    language: "JS", 
    completeCode:"JS Code"
}
]


Judge0 --> Open-source online code execution system

Required Format:
{
    source_code:"code....", 
    language_id: int,
    stdin:"input",
    expected_output:"expected output of input"
}



*/

/*

Pagination 

page=2
await Problem.find({}).skip(10).limit(10)

page=3
await Problem.find({}).skip(20).limit(10)

page=4
await Problem.find({}).skip(30).limit(10)

page = x
no of pages before this page = x-1
no of problems in one page  = 10
no of problems to skip = (x-1)*10 = (current page no. - 1) * limit
await Problem.find({}).skip((page-1)*10).limit(10)


*/