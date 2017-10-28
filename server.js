var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    osc = require('node-osc');
var oscClient = new osc.Client('127.0.0.1', 3333);
// var oscServer;


// server
app.use(express.static('public')); // make public dir files available
server.listen(process.env.PORT || 3000, function() {
  console.log('server running on ' + process.env.PORT + ' or http://localhost:3000/');
}); // start the server


// routes
app.get('/', function (req, res) {
  res.sendFile('index.html');
});

app.get('/hello', function (req, res) {
  // other route
  res.send('this is another page');
});


// Socket.io
io.on('connection', function (client) {

  client.on('message', function(data) {
    console.log(data);
    io.sockets.emit('response', 'hello world'); // send to client socket
    oscClient.send('/message', data);           // send to osc host@port
  });

  console.log('connection from: '+ client.id);
  oscClient.send('/status', client.id + ' connected');

});
