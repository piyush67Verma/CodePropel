const axios = require('axios');

const getLanguageId = (lang) => {
    lang = lang.toLowercase();
    const languages = {
        'c++': 105,
        'java': 91,
        'python': 71,
        'javascript': 102
    }

    return languages[lang];
}

const submitBatch = async (mySubmissionArr) => {
    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
        params: {
            base64_encoded: 'true'
        },
        headers: {
            'x-rapidapi-key': process.env.JUDGE0_API_KEY,
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            submissions:mySubmissionArr
        }
    };

    async function fetchData() {
        try {
            const response = await axios.request(options);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    fetchData();
}

module.exports = { getLanguageId, submitBatch };







