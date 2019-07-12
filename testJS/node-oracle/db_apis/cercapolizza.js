const databaseGES = require('../services/databaseGES.js');

const checkPolizzaQuery =
`
SELECT P.CDISTPROPR, P.CDPROD, P.CDISTGEST FROM SVGES108 P
WHERE P.CDISTPROPR=:cdIstPropr
    AND P.NUPOLIZ=:numPol
`

async function findPolizza(context) {
    let query = checkPolizzaQuery;
    const binds = {};
   
    binds.numPol = context.numPol;
    binds.cdIstPropr = context.cdIstPropr;
   
    const result = await databaseGES.simpleExecuteGES(query, binds);
    
    return result.rows;
}

module.exports.findPolizza = findPolizza;