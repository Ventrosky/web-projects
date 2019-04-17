var express = require("express")
var app = express()
var db = require("./database.js")
var md5 = require("md5")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 8080 

app.listen(PORT, () => {
    console.log(`[*] Running on http://localhost:${PORT}/`)
    console.log(`[*] List users http://localhost:${PORT}/api/users/`)
    console.log(`[*] Users by id http://localhost:${PORT}/api/user/:id`)
    console.log(`[!] Create user: curl -d "username=test1&email=test1%40demo.com&password=test1123" -X POST http://localhost:${PORT}/api/user/`)
});

// API endpoints
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

app.get("/api/users", (req, res, next) => {
    var sql = "select * from user"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.get("/api/user/:id", (req, res, next) => {
    var sql = "select * from user where id = ?" //prevent SQL injection
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});

app.post("/api/user/", (req, res, next) => {
    var errors=[]
    if (!req.body.password){
        errors.push("No password");
    }
    if (!req.body.email){
        errors.push("No email");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        username: req.body.username,
        email: req.body.email,
        password : md5(req.body.password)
    }
    var sql ='INSERT INTO user (username, email, password) VALUES (?,?,?)'
    var params =[data.username, data.email, data.password]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})

app.patch("/api/user/:id", (req, res, next) => {
    var data = {
        username: req.body.username,
        email: req.body.email,
        password : req.body.password ? md5(req.body.password) : null
    }
    db.run(
        `UPDATE user set 
           username = COALESCE(?,username), 
           email = COALESCE(?,email), 
           password = COALESCE(?,password) 
           WHERE id = ?`,
        [data.username, data.email, data.password, req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
})

app.delete("/api/user/:id", (req, res, next) => {
    db.run(
        'DELETE FROM user WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
})

 Default response
app.use((req, res)=> {
    res.status(404);
});




/*
Operation 	    HTTP  	Endpoint
Get a list      GET 	/api/users/
Get by id 	    GET 	/api/user/{id}
Create user 	POST 	/api/user/
Update by id 	PATCH 	/api/user/{id}
Delete by id 	DELETE 	/api/user/{id}
*/