const { omdbUrl, omdbKey } = require('./config');
const fetch = require("node-fetch");

fetch(`${omdbUrl}/?s=batman&y=2018&apikey=${omdbKey}`)
    .then( response => response.json())
    .then( data => console.log(data));