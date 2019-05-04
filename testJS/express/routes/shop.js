const path = require('path');
const rootDir = require('../util/path');
const express = require('express');

const router = express.Router()

// get do exact match, unlike use
router.get('/',(req, res, next) => {
    console.log("This is another middleware");
    //res.send('<h1>Hello</h1>');
    res.sendFile(path.join(rootDir,'views','shop.html'));
});

module.exports = router;