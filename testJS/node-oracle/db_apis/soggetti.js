const database = require('../services/database.js');
 
const baseQuery = 
 `select nusogg "nusogg",
    dsnome "dsnome",
    dscognome "dscognome",
    cdfisc "cdfisc",
    cdpiva "cdpiva",
    dtnasc "dtnasc",
    cdsesso "cdsesso",
    dslocnasc "dslocnasc",
    cdprovnasc "cdprovnasc"
  from svges005`;
 
async function find(context) {
  let query = baseQuery;
  const binds = {};
 
  if (context.nusogg) {
    binds.nusogg = context.nusogg;
 
    query += `\nwhere nusogg = :nusogg`;
  }
 
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
 
module.exports.find = find;