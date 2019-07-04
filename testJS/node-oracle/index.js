const dotenv = require('dotenv')
dotenv.config();

const database = require('./services/database.js');
const webServer = require('./services/web-server.js');
const dbConfig = require('./config/database.js');

const defaultThreadPoolSize = 4;

process.env.UV_THREADPOOL_SIZE = dbConfig.gesPool.poolMax + defaultThreadPoolSize;

console.log(dbConfig);
console.log(process.env);

async function startup() {
  console.log('Starting application');
  try {
    console.log('Initializing database module');
 
    await database.initialize(); 
  } catch (err) {
    console.error(err);
 
    process.exit(1); // Non-zero failure code
  }
  try {
    console.log('Initializing web server module');
 
    await webServer.initialize();
  } catch (err) {
    console.error(err);
 
    process.exit(1); // Non-zero failure code
  }
}
async function shutdown(e) {
    let err = e;
      
    console.log('Shutting down');

    try {
        console.log('Closing database module');
     
        await database.close(); 
      } catch (err) {
        console.log('Encountered error', e);
     
        err = err || e;
    }

    try {
      console.log('Closing web server module');
   
      await webServer.close();
    } catch (e) {
      console.log('Encountered error', e);
   
      err = err || e;
    }
   
    console.log('Exiting process');
   
    if (err) {
      process.exit(1); // Non-zero failure code
    } else {
      process.exit(0);
    }
  }
   
  process.on('SIGTERM', () => {
    console.log('Received SIGTERM');
   
    shutdown();
  });
   
  process.on('SIGINT', () => {
    console.log('Received SIGINT');
   
    shutdown();
  });
   
  process.on('uncaughtException', err => {
    console.log('Uncaught exception');
    console.error(err);
   
    shutdown(err);
  }); 
startup();

/* testing

curl -X "POST" "http://localhost:3000/api/soggetti" \
     -i \
     -H 'Content-Type: application/json' \
     -d $'{
  "dsnome": "test1",
  "dscognome": "test2",
  "cdfisc": "TSTTST80A01H501G",
  "cdpiva": "test",
  "dtnasc": "1980-01-01T00:00:00.000Z",
  "cdsesso": "M",
  "dslocnasc": "Rome",
  "cdprovnasc" : "RM",
  "cdistpropr" : "00001",
  "nusogg" : "999"
}' 

curl -X "PUT" "http://localhost:3000/api/soggetti/999" \
     -i \
     -H 'Content-Type: application/json' \
     -d $'{
  "dsnome": "test1",
  "dscognome": "test2",
  "cdfisc": "TSTTST80A01H501G",
  "cdpiva": "updatedtest",
  "dtnasc": "1980-01-01T00:00:00.000Z",
  "cdsesso": "M",
  "dslocnasc": "Rome",
  "cdprovnasc" : "RM",
  "cdistpropr" : "00001",
  "nusogg" : "999"
}'

curl -i -X "DELETE" "http://localhost:3000/api/soggetti/999"









curl -X "POST" "http://localhost:3000/api/VerificaBusinessPost" \
     -i \
     -H 'Content-Type: application/json' \
     -d $'{
  "codeBus": "20",
  "idUser": "test1",
  "isAbil": false,
  "cdCanale": "XXX",
  "cdGruppo": "99999",
  "cdIstPropr": "99999"
}' 



*/