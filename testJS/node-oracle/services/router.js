const express = require('express');
const router = new express.Router();
const soggetti = require('../controllers/soggetti.js');
 
router.route('/soggetti/:nusogg?')
    .get(soggetti.get)
    .post(soggetti.post)
    .put(soggetti.put)
    .delete(soggetti.delete);
 
module.exports = router;