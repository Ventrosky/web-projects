var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')//IF NOT EXISTS
        db.run(`CREATE TABLE user (
            nusog INTEGER PRIMARY KEY AUTOINCREMENT,
            username text, 
            email text UNIQUE, 
            password text, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,
        (err) => {
            if (err) {
                console.error(err.message)
            }else{
                var insert = 'INSERT INTO user (username, email, password) VALUES (?,?,?)'
                db.run(insert, ["admin","admin@demo.com",md5("admin123")])
                db.run(insert, ["user1","user1@demo.com",md5("user1123")])
            }
        });  
    }
});


module.exports = db