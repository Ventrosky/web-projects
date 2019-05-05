
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//bodyParser.urlencoded({extended: false})
app.use(bodyParser.urlencoded({extended: false}));

// --> 7)  Mount the Logger middleware here
app.use((req, res, next) => {
  console.log("I'm a middleware...");
  // method path - ip
  console.log(req.method, req.path, '-', req.ip);
  next();
});

// --> 11)  Mount the body-parser middleware  here


/** 1) Meet the node console. */
console.log("Hello World");

/** 2) A first working Express Server */
app.get('/root',(req, res) => {
  res.send('Hello Express');
});

/** 3) Serve an HTML file */
const absolutePath = __dirname + '/views/index.html';
app.get('/',(req, res) => {
  res.sendFile(absolutePath);
});

/** 4) Serve static assets  */

app.use(express.static(__dirname + '/public'));
/** 5) serve JSON on a specific route */
 
app.get('/json',(req, res) => {
  
  res.json({"message": (process.env.MESSAGE_STYLE === 'uppercase' ? "HELLO JSON" : "Hello json")});
});
/** 6) Use the .env file to configure the app */
 
 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */
app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
  },
  (req, res) => {
      res.json({'time': req.time}); // This will display "time" to the user
  });

/** 9)  Get input from client - Route parameters */
app.get("/:word/echo", function(req, res) {
  res.json({echo: req.params.word});
});

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
 app.get("/name", function(req, res) {
   var firstName = req.query.first;
   var lastName = req.query.last;
   res.json({name: firstName +' '+ lastName});
 });
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */
app.post('/name', (req, res) => {
  // Handle the data in the request
  res.json({name: req.body.first +' '+ req.body.last});
});


// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
