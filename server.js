
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var mongoClient = require("mongodb").MongoClient;
var objectId = require("mongodb").ObjectID;
var jsonParser = bodyParser.json();
var url = "mongodb://localhost:27017";

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static('www'))

app.get('/', function (req, res) {
  res.sendfile('./Main.html');
});
app.get('/About', function (req, res) {
  res.sendfile('./About.html');
});
app.get('/Form', function (req, res) {
  res.sendfile('./Form.html');
});
app.post('/Form', jsonParser, function (req, res) {
  if(!req.body) return res.sendStatus(400);
      
  var userName = req.body.name;
  var userFam = req.body.fam;
  var user = {name: userName, fam: userFam};
    
  mongoClient.connect(url, function(err, client){
      client.db("usersdb").collection("users").insertOne(user, function(err, result){
            
          if(err) return res.status(400).send();
            
          res.sendfile('./Main.html');
          client.close();
      });
  });
  console.log(req.body.name);
  console.log(req.body.fam);
  //res.send('Data downloaded');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});