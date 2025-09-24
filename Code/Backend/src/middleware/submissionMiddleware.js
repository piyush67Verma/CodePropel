const Problem = require('../models/problems');
const Submission = require('../models/submission');
const { getLanguageId, submitBatch, submitTokens } = require('../utils/problemUtility');
const submitCode = async (req, res) => {
    try {

        const userId = req.result._id;
        const problemId = req.params.id;

        const { code, language } = req.body;

        //validating above fields
        if (!userId || !problemId || !code || !language) {
            return res.status(400).send("Some fields missing");
        }

        //fetching problem 
        const problem = await Problem.findById(problemId);

        //initially save the submitted code with some other details in the DB
        const submittedResult = await Submission.create({
            userId,
            problemId,
            code,
            language,
            testCasesTotal: problem.hiddenTestCases.length
        });

        // Pass the code to judge0 to execute 
        const languageId = getLanguageId(language);
        const submissions = problem.hiddenTestCases.map((testcase) => {
            return {
                source_code: code,
                language_id: languageId,
                stdin: testcase.input,
                expected_output: testcase.output
            }
        });

        const submitResult = await submitBatch(submissions);
       
        const arrOfTokens = submitResult.map((obj) => {
            return obj.token;
        })

        const testResult = await submitTokens(arrOfTokens);
        
       // update submittedResult
       let passedTCCount = 0;
       let totalRuntime = 0;
       let maxMemory = 0;
       let finalStatus = 'accepted';
       let finalErrMsg = null;
       for(let test of testResult){
            if(test.status_id==3){
                passedTCCount+=1;
                totalRuntime+=parseFloat(test.time);
                maxMemory = Math.max(maxMemory, test.memory);
            }
            else if(test.status_id==4){
                finalStatus = 'wrong';
                finalErrMsg = test.stderr;
            }
            else{
                finalStatus = 'error';
                finalErrMsg = test.stderr;
            }
       }

      submittedResult.status = finalStatus;
      submittedResult.errorMessage = finalErrMsg;
      submittedResult.testCasesPassed = passedTCCount;
      submittedResult.runtime = totalRuntime;
      submittedResult.memory = maxMemory;
    
      await submittedResult.save();
      

     if(!req.result.problemSolved.includes(problemId)){
        req.result.problemSolved.push(problemId);
        await req.result.save();
     }

     res.status(201).send(submittedResult);
    }
    catch (err) {
        res.status(500).send('Error: ' + err.message);
    }

    
}

const runCode = async(req, res)=>{
     try {

        const problemId = req.params.id;

        const { code, language } = req.body;

        //validating above fields
        if (!problemId || !code || !language) {
            return res.status(400).send("Some fields missing");
        }

        //fetching problem 
        const problem = await Problem.findById(problemId);

        
        // Pass the code to judge0 to execute 
        const languageId = getLanguageId(language);
        const submissions = problem.visibleTestCases.map((testcase) => {
            return {
                source_code: code,
                language_id: languageId,
                stdin: testcase.input,
                expected_output: testcase.output
            }
        });

        const submitResult = await submitBatch(submissions);
       
        const arrOfTokens = submitResult.map((obj) => {
            return obj.token;
        })
       
        const testResult = await submitTokens(arrOfTokens);
        
        res.status(200).send(testResult);
    }
    catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
}


module.exports = {submitCode, runCode};