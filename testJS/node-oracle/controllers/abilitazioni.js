const abilitazioni = require('../db_apis/abilitazioni.js');

function getAbilitazioneFromRec(req) {
    const abilitazione = {
        codeBus: req.body.codeBus,
        idUser: req.body.idUser,
        isAbil: req.body.isAbil,
        cdCanale: req.body.cdCanale,
        cdGruppo: req.body.cdGruppo,
        cdIstPropr: req.body.cdIstPropr
    };

    return abilitazione;
}
 
async function post(req, res, next) {
    console.log(req.headers['authorization']);
    try {
      let abilitazione = getAbilitazioneFromRec(req);
   
      let result = await abilitazioni.find(abilitazione);
      console.log(result);
      if (result.length==0){
        abilitazione.isAbil = false;
      } else {
        abilitazione.isAbil = true;  
      }
      res.status(200).json(abilitazione);
    } catch (err) {
      next(err);
    }
}

   
module.exports.post = post; 