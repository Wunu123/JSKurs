console.log('server-linien.js');


var express=require('express');
var bp = require('body-parser');
var fs=require('fs');
var request = require('request');
var csv = require('csv');

var ubahnen;
var steige;

fs.readFile('ubahnen.json', function(err,data){
  try{
    ubahnen = JSON.parse(data);
  } catch(e) {
    ubahnen = {};
  }
});

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
    //  console.log(body);
      csv.parse(body,{delimiter:';'}, function(error, data){
      //  console.log(data);
      //  var ubahnen = {};
        //bei 1 starten weil 0 sind die Spaltenbezeichnungen
        for (let i=1; i<data.length;i++){
          if (data[i][4] !='ptMetro') continue;
          ubahnen[data[i][1]] = data[i][0];
        }
        //console.log(ubahnen);
        fs.writeFile('ubahnen.json', JSON.stringify(ubahnen),function(){
          res.writeHead(200,{'Content-Type':'application/json'});
          res.end('{"result":"success"}');

        });
    });
    } else {

      res.code(404).end();
    }
  });
});
//---------------------------------------------------------------------------
app.post('/getLineData', function(req,res){
  request.get('https://data.wien.gv.at/csv/wienerlinien-ogd-steige.csv',
  function(err,response,body){
    if(!err && res.statusCode == 200){
      console.log(body);
      csv.parse(body,{delimiter:';'}, function(error, data){
        console.log(data);
      //  var ubahnen = {};
        //bei 1 starten weil 0 sind die Spaltenbezeichnungen
      /*  for (let i=1; i<data.length;i++){
          if (data[i][4] !='ptMetro') continue;
          ubahnen[data[i][1]] = data[i][0];
        }
        //console.log(ubahnen);
        fs.writeFile('ubahnen.json', JSON.stringify(ubahnen),function(){

        }); */
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end('{"result":"success"}');
    });
    } else {

      res.code(404).end();
    }
  });
});
//----------------------------------------------------------------------------
app.post('/getWLData', function(req,res){
  request.get('https://data.wien.gv.at/csv/wienerlinien-ogd-haltestellen.csv',
  function(err,response,body){
    if(!err && res.statusCode == 200){
      console.log(body);
      csv.parse(body,{delimiter:';'}, function(error, data){
        console.log(data);
      //  var ubahnen = {};
        //bei 1 starten weil 0 sind die Spaltenbezeichnungen
      /*  for (let i=1; i<data.length;i++){
          if (data[i][4] !='ptMetro') continue;
          ubahnen[data[i][1]] = data[i][0];
        }
        //console.log(ubahnen);
        fs.writeFile('ubahnen.json', JSON.stringify(ubahnen),function(){

        }); */
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end('{"result":"success"}');
    });
    } else {

      res.code(404).end();
    }
  });
});
