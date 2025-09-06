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
        res.status(400).send("Error: " + err.message);
    }
}

module.exports = { createProblem };


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