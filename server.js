var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var osc = require('node-osc');
const PORT = process.env.PORT || 3000;
var oscClient = new osc.Client('127.0.0.1', 3333);
// var oscServer;

var users = 0;

// express server
server.listen(PORT, function() {
  console.log('server running on port: ' + PORT);
}); // start the server
app.use(express.static('public'));



// server routes
app.get('/', function (req, res) {
  res.sendFile('index.html');
});

app.get('/hello', function (req, res) {
  // other route
  res.send('this is another page');
});



// socket io
io.on('connection', function (client) {

  // on connect
  users++;
  console.log('connection from: '+ client.id);
  oscClient.send('/status', client.id + ' connected');



  client.on('message', function(data) {
    console.log(data);
    // io.sockets.emit('response', 'hello world'); // send to client socket
    io.sockets.emit('post', data); // send to client socket
    oscClient.send('/chat/message', data);           // send to osc host@port
  });



  client.on('disconnect', function() {
    users--;
    console.log(users);
  });


});
