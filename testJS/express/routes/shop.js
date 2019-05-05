const path = require('path');
const rootDir = require('../util/path');
const express = require('express');

const router = express.Router()
const adminData = require('./admin');

// get do exact match, unlike use
router.get('/',(req, res, next) => {
    console.log(adminData.products);
    //res.send('<h1>Hello</h1>');
    //res.sendFile(path.join(rootDir,'views','shop.html'));

    const products = adminData.products;
    res.render('shop',{prods: products, pageTitle: 'Shop', path: '/'});
});

module.exports = router;