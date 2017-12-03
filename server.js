var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const PORT = process.env.PORT || 3000;

// cli
var sys = require('sys')
var exec = require('child_process').exec;
var child;

var osc = require('node-osc');
// var oscClient = new osc.Client('127.0.0.1', 3333);
var oscClient = new osc.Client('192.168.1.5', 3333); // IP of UnrealComputer

// var oscServer;

var users = 0;

var currentPrompt = 1;
var noYesCount = [0, 0];


// cli SAY
var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) {
  // console.log('stdout');
}

// express server
server.listen(PORT, function() {
  console.log('server running on port: ' + PORT);
}); // start the server
app.use(express.static('public'));



// server routes
app.get('/', function (req, res) {
  res.sendFile('index.html');
});

app.get("/logs", function (req, res) {
  // other route
  res.sendFile('logs.html', {'root': __dirname + '/public'});
});

app.get("/config", function (req, res) {
  // other route
  res.sendFile('config.html', {'root': __dirname + '/public'});
});



// socket io
io.on('connection', function (client) {

  socket.on( "echo", function ( msg, callback ) {
      console.log('tried sending message from server1');
      io.sockets.emit('bounce', {my: 'data'}); // send to client socket
      // callback( msg );
  } );

  // on connect
  users++;
  console.log('connection from: '+ client.id);
  oscClient.send('/status', client.id + ' connected');

  io.sockets.emit('prompt', currentPrompt);          // trigger a prompt popup



  client.on('message', function(data) {
    console.log(data);
    // io.sockets.emit('response', 'hello world'); // send to client socket

    if ( data.substring(0, 2) == '::' ) {
      currentPrompt = data.substring(2);
      if ( currentPrompt == 'noYes' ) {
        io.sockets.emit('inputMode', currentPrompt);          // trigger a prompt popup or change input style
      }
      if ( currentPrompt == 'text' ) {
        io.sockets.emit('inputMode', currentPrompt);          // trigger a prompt popup or change input style
      }
      else {
        io.sockets.emit('prompt', currentPrompt);          // trigger a prompt popup or change input style
      }
    }
    else {
      io.sockets.emit('post', data);          // send to client socket
      oscClient.send('/chat/message', data);  // send to osc host@port

      // cli say
      exec('say "'+ data +'"', puts);
    }

  });



  client.on('noYes', function(data) {
    if ( data == 'No' ) {
      noYesCount[0]++;
      io.sockets.emit('noYesCount', noYesCount);
    }
    else if ( data == 'Yes') {
      noYesCount[1]++;
      io.sockets.emit('noYesCount', noYesCount);
    }
    console.log('no/yes count: ' + noYesCount);
  });



  client.on('disconnect', function() {
    users--;
    console.log(users);
  });


});
