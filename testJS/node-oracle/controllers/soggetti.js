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
 
module.exports.get = get;