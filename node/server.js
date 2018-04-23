var http = require('http');
var fs = require('fs');//Filesystem

http.createServer(function(request, response){
  console.log('Anfrage an den Server...');
  console.log(request.url);
  if(request.url == '/'){
    response writeHead(200, {'content-Type':'text/html'})
    fs.readFile('test.html',function(err, data){
      response.end(data);
    });
    //response.end('Hallo WElt');
  } else {
    response.writeHead(404);
    response.end('Error 404');
  }
  //response.end('Hallo Welt!');

}).listen(12345);

console.log('server ist gestartet!');
console.log('URL http://localhost:12345');
