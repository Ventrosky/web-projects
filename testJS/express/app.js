//const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

// parser
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

//app.use(bodyParser.json());
/*app.use((req, res, next) => {
    console.log("This is the middleware");
    next(); //allow continue to next middleware in line
});*/

app.use((req, res, next) => {
    //res.status(404).send('<h1>Page Not Found</h1>');
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
});


app.listen(3000);/* same as
const server = http.createServer(app);
server.listen(3000); */
