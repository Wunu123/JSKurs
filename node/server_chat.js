//Module
var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(26893, function(){
  console.log('WIFI Secret Chat.');
});

app.use(express.static('static'));

app.get('/', function(request, response){
  response.sendFile(__dirname+'/d13-chat.html');
})

var io = socket(server);
io.on('connection', function(socket){
  var users =[];

  var now = new Date(Date.now());
  var zeit = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
  var user;
  socket.on('neueruser', function(name){
    users.push(name);
    console.log(users);
    user=name;
    io.emit('servershout',zeit+'<br><em><b>'+name+'</b> ist online.</em>');
  });
  socket.on('disconnect', function(){
    var now = new Date(Date.now());
    var zeit = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    io.emit('servershout', zeit+'<br><em><b>'+user+'</b> ist offline.</em>')
  });

  socket.on('clientshout', function(msg){
    var now = new Date(Date.now());
    var zeit = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
      io.emit('servershout',zeit+'<br><b>'+user+'</b>: '+msg);
  });

});
