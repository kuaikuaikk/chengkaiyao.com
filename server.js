var express = require('express')
var server = express()
const bodyParser = require('body-parser')
const port = 80
const path = require('path');
const mysql = require('mysql')

server.use(express.static("public"));

var users = [];


server.use(bodyParser.json());

var con = mysql.createConnection({
    host: "localhost",
    user: "chengkai",
    password: "1212",
    database: "myWeb"
});

con.connect(function(err) {
    if (err) throw err
    console.log("database connected.")
    
})


server.listen(port, function(){
    console.log(`Server running on port ${port}`)
})


server.post('/', function(req, res, next) {
    res.sendFile(path.join(__dirname + '/index.html'));  
    res.sendStatus(200)
})


server.get('/momentPic', function(req, res, next) {
    var data = [];
    con.query("SELECT * FROM momentPic ORDER BY Date_Taken DESC;", function (err, rows, fields) {
        if (err) throw err;
        for (var i = 0; i < rows.length; i++) {
            data.push({url: rows[i].URL.toString(), date: rows[i].Date_Taken.toString()});
            
            
        }
        res.json(data);
    });
    

})


