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
var currentPrompt = {type: 'tt', value: 'red or blue'};

var noYesCount = [0, 0];


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
  io.sockets.emit('changeP', currentPrompt);





  // get the prompt change and send to everyone
  client.on('change', function ( data ) {
      console.log(data);
      currentPrompt = data;
      io.sockets.emit('changeP', currentPrompt);
  });





  client.on('message', function(data) {
    console.log(data);
    // io.sockets.emit('response', 'hello world'); // send to client socket

    // if ( data.substring(0, 2) == '::' ) {
    //   currentPrompt = data.substring(2);
    //   if ( currentPrompt == 'noYes' ) {
    //     io.sockets.emit('inputMode', currentPrompt);          // trigger a prompt popup or change input style
    //   }
    //   if ( currentPrompt == 'text' ) {
    //     io.sockets.emit('inputMode', currentPrompt);          // trigger a prompt popup or change input style
    //   }
    //   else {
    //     io.sockets.emit('prompt', currentPrompt);          // trigger a prompt popup or change input style
    //   }
    // }
    // else {
    //   io.sockets.emit('post', data);          // send to client socket
    //   // oscClient.send('/chat/message', data);  // send to osc host@port
    //
    //   // cli say
    //   exec('say "'+ data +'"', puts); // TODO send stripped data only - from RiTa.js NLP
    // }

    io.sockets.emit('post', data);  // send to client socket
    exec('say "'+ data +'"', puts); // TODO send stripped data only - from RiTa.js NLP

  });

  client.on('choice', function(data) {
    io.sockets.emit('post', data);  // send to client socket
    exec('say "'+ data +'"', puts); // TODO send stripped data only - from RiTa.js NLP
  });



  // client.on('noYes', function(data) {
  //   if ( data == 'No' ) {
  //     noYesCount[0]++;
  //     io.sockets.emit('noYesCount', noYesCount);
  //   }
  //   else if ( data == 'Yes') {
  //     noYesCount[1]++;
  //     io.sockets.emit('noYesCount', noYesCount);
  //   }
  //   console.log('no/yes count: ' + noYesCount);
  // });



  client.on('disconnect', function() {
    users--;
    // console.log(users);
  });

});
