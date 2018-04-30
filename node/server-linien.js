console.log('server-linien.js');


var express=require('express');
var bp = require('body-parser');
var fs=require('fs');
var request = require('request');
var csv = require('csv');

var app = express();

var server = app.listen(5001,function(){
  console.log('Server läuft auf Port 5001');
});

app.use(bp.urlencoded({extended:true} ));
app.use(express.static('static'));

app.get('/', function(request, response){
  response.sendFile(
    __dirname+'/d14-WRlinien.html');
});

app.post('/getWLData', function(req,res){
  request.get('https://data.wien.gv.at/csv/wienerlinien-ogd-linien.csv',
  function(err,response,body){
    if(!err && res.statusCode == 200){
      console.log(body);
      res.writeHead(200,{'Content-Type':'application/json'});
      res.end('{"result":"success"}');
    } else {

      res.code(404).end();
    }
  });
});
