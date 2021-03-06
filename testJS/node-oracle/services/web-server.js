const http = require('http');
const express = require('express');
const webServerConfig = require('../config/web-server.js');
const morgan = require('morgan');
//const databaseGES = require('./databaseGES.js');
const router = require('./router.js');

const verifyToken = require('../middlewares/verifytoken.js');

let httpServer;
 
function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();
    httpServer = http.createServer(app);
    
    app.use(morgan('combined'));

    app.use(express.json({
        reviver: reviveJson
    }));

    app.use('/api/bot', verifyToken, router);//http://server:port/api/soggetti/:nusogg
    //app.get('/', async (req, res) => {
    //    const result = await databaseGES.simpleExecute('select user, systimestamp from dual');
    //    const user = result.rows[0].USER;
    //    const date = result.rows[0].SYSTIMESTAMP;
    //
    //    res.end(`DB user: ${user}\nDate: ${date}`);
    //});
 
    httpServer.listen(webServerConfig.port)
      .on('listening', () => {
        console.log(`Web server listening on localhost:${webServerConfig.port}`);
 
        resolve();
      })
      .on('error', err => {
        reject(err);
      });
  });
}

function close() {
    return new Promise((resolve, reject) => {
      httpServer.close((err) => {
        if (err) {
          reject(err);
          return;
        }
   
        resolve();
      });
    });
}

const iso8601RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
 
function reviveJson(key, value) {
  // revive ISO 8601 date strings to instances of Date
  if (typeof value === 'string' && iso8601RegExp.test(value)) {
    return new Date(value);
  } else {
    return value;
  }
}

module.exports.close = close;
module.exports.initialize = initialize;