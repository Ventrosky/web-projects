//const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'pug');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// parser
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

//app.use(bodyParser.json());
/*app.use((req, res, next) => {
    console.log("This is the middleware");
    next(); //allow continue to next middleware in line
});*/

app.use((req, res, next) => {
    //res.status(404).send('<h1>Page Not Found</h1>');
    //res.status(404).sendFile(path.join(__dirname,'views','404.html'));
    res.status(404).render('404', {pageTitle: 'Page Not Found'});
});


app.listen(3000);/* same as
const server = http.createServer(app);
server.listen(3000); */
