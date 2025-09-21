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


/*

const submissionSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'users', 
        required:true
    }, 
    probemId:{
        type:Schema.Types.ObjectId,
        ref:'problems', 
        required:true
    },
    code:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true,
        enum:['c++', 'java', 'javascript', 'python']
    }, 
    status:{
        type:String,
        enum:['pending','accepted', 'wrong', 'error'],
        required:true,
        default:'pending'
    }, 
    runtime:{
        type:Number,
        default:0
    },
    memory:{
        type:Number,
        default:0
    },
    errorMessage:{
        type:String,
        default:''
    },
    testCasesPassed:{
        type:Number,
        default:0
    },
    testCasesTotal:{
        type:Number,
        default:0
    }
    
}, {timestamps:true});



*/
module.exports = submitCode;