const polizze = require('../db_apis/cercapolizza.js');

const codicetodesc = require('../db_apis/codicetodesc.js');

function getPolizzaFromRec(req) {
    const polizza = {
        numPol: req.body.numPol,
        idUser: req.body.idUser,
        cdIstPropr: req.body.cdIstPropr,
        quantePol: req.body.quantePol,
        compagnie: req.body.compagnie,
        prodotti: req.body.prodotti
    };

    return polizza;
}

async function post(req, res, next) {
    try {
      let polizza = getPolizzaFromRec(req);
   
      let result = await polizze.findPolizza(polizza);
      polizza.quantePol = result.length;

      let resolveGEST = await Promise.all(result.map(function(row){
            return codicetodesc.getDSGest(row);
        }))
        .then(data => {
            return data.flat().map(function(name){
                return name["DSISTGEST"];
            });
      });
      polizza.compagnie = resolveGEST.join(',') || '';

      let resolvePROD = await Promise.all(result.map(function(row){
            return codicetodesc.getDSProd(row);
        }))
        .then(data => {
            return data.flat().map(function(name){
                return name["DSPROD"];
            });
      });
      polizza.prodotti = resolvePROD.join(',') || '';

      console.log(polizza);

      res.status(200).json(polizza);
    } catch (err) {
      next(err);
    }
}

   
module.exports.post = post; 