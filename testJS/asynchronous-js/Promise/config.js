// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  omdbUrl: process.env.OMDb_API_URL,
  omdbKey: process.env.OMDb_API_KEY
};