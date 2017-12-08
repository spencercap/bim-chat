// server + io
var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const PORT = process.env.PORT || 3000;

// cli
var sys = require('util')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) {
  // console.log('stdout');
}

// vars
var users = 0;
var currentPrompt = {type: 'tt', value: 'ready or not'};
var tt = [0, 0];


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

  // on connect initialize things
  users++;
  console.log('connection from: '+ client.id);
  io.sockets.emit('users', users);  // send to client socket
  // io.sockets.emit('changeP', currentPrompt);



  // get the prompt change and send to everyone
  client.on('change', function ( data ) {
    // console.log(data);
    currentPrompt = data;
    io.sockets.emit('changeP', currentPrompt);
    tt = [0, 0];
  });

  client.on('getPrompt', function ( ) {
    // console.log(data);
    io.sockets.emit('promptInit', currentPrompt);
  });


  client.on('message', function(data) {
    // console.log(data);
    data.score = tt;
    io.sockets.emit('post', data);  // send to client socket
    // exec('say "'+ data.value +'"', puts); // TODO send stripped data only - from RiTa.js NLP
  });


  client.on('choice', function(data) {
    // console.log(data);
    if ( data.button == 'this' ) {
      tt[0]++;
    }
    else if ( data.button == 'that' ) {
      tt[1]++;
    }
    data.score = tt;
    io.sockets.emit('post', data);  // send to client socket
    // exec('say "'+ data.value +'"', puts); // TODO send stripped data only - from RiTa.js NLP
  });


  client.on('disconnect', function() {
    users--;
    io.sockets.emit('users', users);  // send to client socket
    // console.log(users);
  });

});
