const oracledbCFG = require('oracledb');
const dbConfig = require('../config/database.js');
 
async function initialize() {
  await oracledbCFG.createPool(dbConfig.cfgPool);
}

async function close() {
    await oracledbCFG.getPool().close();
}

function simpleExecuteCFG(statement, binds = [], opts = {}) {
    return new Promise(async (resolve, reject) => {
      let conn;
      console.log("Execute query CFG");
      opts.outFormat = oracledbCFG.OBJECT;
      opts.autoCommit = true;
   
      try {
        conn = await oracledbCFG.getConnection("CFG");
   
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
   
module.exports.simpleExecuteCFG = simpleExecuteCFG;
module.exports.close = close; 
module.exports.initialize = initialize;