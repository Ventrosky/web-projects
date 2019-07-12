const databaseCFG = require('../services/databaseCFG.js');

const CDtoDSforGEST =
`
SELECT DSISTGEST FROM SVTAS101 WHERE
    CDISTPROPR=:cdIstPropr
    AND CDISTGEST =:cdIstGest
`
const CDtoDSforPROD =
`
SELECT DSPROD FROM SVTAS301 WHERE
    CDISTPROPR=:cdIstPropr
    AND CDPROD =:cdprod
`

async function getDSGest(context) {
    let query = CDtoDSforGEST;
    const binds = {};
    binds.cdIstPropr = context.CDISTPROPR;
    binds.cdIstGest = context.CDISTGEST;
    console.log(context) 
    const result = await databaseCFG.simpleExecuteCFG(query, binds);
    
    return result.rows;
}

async function getDSProd(context) {
    let query = CDtoDSforPROD;
    const binds = {};
    binds.cdIstPropr = context.CDISTPROPR;
    binds.cdprod = context.CDPROD;
    console.log(context) 
    const result = await databaseCFG.simpleExecuteCFG(query, binds);
    
    return result.rows;
}
module.exports.getDSGest = getDSGest;
module.exports.getDSProd = getDSProd;