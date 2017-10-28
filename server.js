var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    socketIO = require('socket.io'),
    osc = require('node-osc');
const io = socketIO(server);
const PORT = process.env.PORT || 3000;
// var oscClient = new osc.Client('127.0.0.1', 3333);
// var oscServer;

var users = 0;


// server
app.use(express.static('public')); // make public dir files available
server.listen(PORT, function() {
  console.log('server running on ' + PORT);
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
  users++;
  console.log(users);

  console.log('connection from: '+ client.id);
  // oscClient.send('/status', client.id + ' connected');

  client.on('disconnect', function() {
    users--;
    console.log(users);
  });

  client.on('message', function(data) {
    console.log(data);
    io.sockets.emit('response', 'hello world'); // send to client socket
    // oscClient.send('/message', data);           // send to osc host@port
  });



});
