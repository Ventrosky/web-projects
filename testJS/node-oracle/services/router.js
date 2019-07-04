const express = require('express');
const router = new express.Router();
//const soggetti = require('../controllers/soggetti.js');

const abilitazioni = require('../controllers/abilitazioni.js');

/*
router.route('/soggetti/:nusogg?')
    .get(soggetti.get)
    .post(soggetti.post)
    .put(soggetti.put)
    .delete(soggetti.delete);
*/
router.route('/VerificaBusinessPost')
    .post(abilitazioni.post);


module.exports = router;