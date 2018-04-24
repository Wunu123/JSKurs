//Module
var express = require('express');
var fs = require('fs');
var bp=require('body-parser');

var app =express();

app.listen(5000, function(){
  console.log('Server gestartetPort 5000');
});

/* app.use(function(req, res,next){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET, POST');
  next();
}); */

app.use(express.static('static'));

//Wandelt POST-Daten in Javascript-Objekt rewuest.body.um
app.use(bp.urlencoded({extended:true}));


var alleOrte; // globale Variable
fs.readFile('orte.json', function(err, data){
  alleOrte = JSON.parse(data);
  console.log('initial load Data', alleOrte.orte);
});
//Request Daten werden als JSON mitgeschickt
//app.use(bp.json());

app.post('/orte', function(reqest, response){
  /*res.writeHead(200,{'content-Type':'text/html'});
  res.end('OK');*/
  var neuerOrt = {
    name:request.body.name,
    lat:request.body.lat*1,
    lan:request.body.lan*1
  }
  if (neuerOrt.name && neuerOrt.lat && neuerOrt.lan){
    //Daten speichern
    alleOrte.orte.push(neuerOrt);
    fs.writeFile('orte.json', JSON.stringify(alleOrte), function(){
      response.writeHead(200,{'Content-Type':'application/json'});
      response.end(JSON.stringify({result:true}));
    });


  } else {
    //error
    response.status(500).end();
    response.end(JSON.stringify(alleOrte));
  }
});

app.post('/zeigeorte', function(request, response){
  response.writeHead(200,{'Content-Type':'application/json'});

})

app.get('/', function(req,res){
  fs.readFile('d13-orte.html', function(err, data){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(data);
  });
});
