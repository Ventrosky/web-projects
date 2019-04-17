const soggetti = require('../db_apis/soggetti.js');
 
async function get(req, res, next) {
  try {
    const context = {};
 
    context.nusogg = parseInt(req.params.nusogg, 10);
 
    const rows = await soggetti.find(context);
 
    if (req.params.nusogg) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}

function getSoggettoFromRec(req) {
    const soggetto = {
        dsnome: req.body.dsnome,
        dscognome: req.body.dscognome,
        cdfisc: req.body.cdfisc,
        cdpiva: req.body.cdpiva,
        dtnasc: req.body.dtnasc,
        cdsesso: req.body.cdsesso,
        dslocnasc: req.body.dslocnasc,
        cdprovnasc: req.body.cdprovnasc,
        nusogg: req.body.nusogg,
        cdistpropr: req.body.cdistpropr
    };
   
    return soggetto;
}
 
async function post(req, res, next) {
    try {
      let soggetto = getSoggettoFromRec(req);
   
      soggetto = await soggetti.create(soggetto);
   
      res.status(201).json(soggetto);
    } catch (err) {
      next(err);
    }
}

async function put(req, res, next) {
  try {
    let soggetto = getSoggettoFromRec(req);
 
    //soggetto.nusogg = parseInt(req.params.nusogg, 10);
 
    soggetto = await soggetti.update(soggetto);
 
    if (soggetto !== null) {
      res.status(200).json(soggetto);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}
async function del(req, res, next) {
    try {
      const nusogg = parseInt(req.params.nusogg, 10);
   
      const success = await soggetti.delete(nusogg);
   
      if (success) {
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }
  }
   
module.exports.delete = del; 
module.exports.put = put;   
module.exports.post = post; 
module.exports.get = get;