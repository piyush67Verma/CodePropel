const app = require('../src/index'); // path to your Express app
const serverless = require('serverless-http');

module.exports = serverless(app);
