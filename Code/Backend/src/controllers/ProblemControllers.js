const {getLanguageId, submitBatch} = require('../utils/problemUtility');

const createProblem = async (req, res)=>{
    const {title, description, difficulty, 
        tags, visibleTestCases, hiddenTestCases,
        startCode, referenceSolution, problemCreator
    } = req.body;

    try{
        for(let {language, completeCode} of referenceSolution){
            const languageId = getLanguageId(language);
            const submissions = visibleTestCases.map(({input, output})=>{
                return {
                    source_code:completeCode,
                    language_id:languageId, 
                    stdin:input,
                    expected_output:output
                }
            });

            const submitResult = await submitBatch(submissions);

        }
    }
    catch(err){
        res.send("Error: "+err.message);
    }
}

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