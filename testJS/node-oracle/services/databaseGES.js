const oracledbGES = require('oracledb');
const dbConfig = require('../config/database.js');
 
async function initialize() {
  await oracledbGES.createPool(dbConfig.gesPool);
}

async function close() {
    await oracledbGES.getPool().close();
}

function simpleExecuteGES(statement, binds = [], opts = {}) {
    return new Promise(async (resolve, reject) => {
      let conn;
      console.log("Execute query GES");
      opts.outFormat = oracledbGES.OBJECT;
      opts.autoCommit = true;
   
      try {
        conn = await oracledbGES.getConnection("GES");
   
        const result = await conn.execute(statement, binds, opts);
   
        resolve(result);
      } catch (err) {
        reject(err);
      } finally {
        if (conn) {
          try {
            await conn.close();
          } catch (err) {
            console.log(err);
          }
        }
      }
    });
}
   
module.exports.simpleExecuteGES = simpleExecuteGES;
module.exports.close = close; 
module.exports.initialize = initialize;