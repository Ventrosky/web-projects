const database = require('../services/database.js');
const oracledb = require('oracledb');

const baseQuery = 
 `select nusogg "nusogg",
    dsnome "dsnome",
    dscognome "dscognome",
    cdfisc "cdfisc",
    cdpiva "cdpiva",
    dtnasc "dtnasc",
    cdsesso "cdsesso",
    dslocnasc "dslocnasc",
    cdprovnasc "cdprovnasc",
    cdistpropr "cdistpropr"
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

const createSql =
 `insert into svges025 (
    dsnome,
    dscognome,
    cdfisc,
    cdpiva,
    dtnasc,
    cdsesso,
    dslocnasc,
    cdprovnasc,
    nusogg,
    cdistpropr
  ) values (
    :dsnome,
    :dscognome,
    :cdfisc,
    :cdpiva,
    :dtnasc,
    :cdsesso,
    :dslocnasc,
    :cdprovnasc,
    :nusogg,
    :cdistpropr
  ) `;
 
async function create(sog) {
  const soggetto = Object.assign({}, sog);
 
  /*soggetto.nusogg = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  }*/
 
  const result = await database.simpleExecute(createSql, soggetto);
 
  //soggetto.nusogg = result.outBinds.nusogg[0];
 
  return soggetto;
}

const updateSql =
 `update svges025
  set dsnome = :dsnome,
    dscognome = :dscognome,
    cdfisc = :cdfisc,
    cdpiva = :cdpiva,
    dtnasc = :dtnasc,
    cdsesso = :cdsesso,
    dslocnasc = :dslocnasc,
    cdprovnasc = :cdprovnasc,
    cdistpropr = :cdistpropr,
    nusogg = :nusogg
  where nusogg = :nusogg`;
 
async function update(sog) {
  const soggetto = Object.assign({}, sog);
  const result = await database.simpleExecute(updateSql, soggetto);
 
  if (result.rowsAffected && result.rowsAffected === 1) {
    return soggetto;
  } else {
    return null;
  }
}
const deleteSql =
 `begin
 
    delete from svges025
    where nusogg = :nusogg;
 
    :rowcount := sql%rowcount;
 
  end;`
 
async function del(nusogg) {
  const binds = {
    nusogg: nusogg,
    rowcount: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER
    }
  }
  const result = await database.simpleExecute(deleteSql, binds);
 
  return result.outBinds.rowcount === 1;
}
 
module.exports.delete = del; 
module.exports.update = update; 
module.exports.create = create;
module.exports.find = find;