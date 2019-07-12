const databaseCFG = require('../services/databaseCFG.js');

const checkQuery =
`
SELECT G.CDCANALE FROM GRUPPI_ABIL_BUSINESS G
JOIN ATTIVAZIONE_BUSINESS A 
    ON G.CDCANALE = A.COD_CANALE AND G.CDBUSINESS = A.COD_BUSINESS
WHERE G.CDBUSINESS=:codeBus
    AND (G.CDCANALE=:cdCanale OR G.CDCANALE IN (SELECT COD_CANALE FROM CANALI WHERE FLDEFAULT ='S'))
    AND G.CDGRUPPO=:cdGruppo
    AND G.CDISTPROPR=:cdIstPropr
    AND A.FLG_ATTIVO='S'
`
async function find(context) {
    let query = checkQuery;
    const binds = {};
   
    binds.codeBus = context.codeBus;
    binds.cdCanale = context.cdCanale;
    binds.cdGruppo = context.cdGruppo;
    binds.cdIstPropr = context.cdIstPropr;
    
    const result = await databaseCFG.simpleExecuteCFG(query, binds);
    
    return result.rows;
}

module.exports.find = find;