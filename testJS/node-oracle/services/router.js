const express = require('express');
const router = new express.Router();
const employees = require('../controllers/soggetti.js');
 
router.route('/soggetti/:nusogg?')
  .get(employees.get);
 
module.exports = router;