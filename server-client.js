// io
var ioc = require( 'socket.io-client' );
// var client = ioc.connect( "https://bim-chat.herokuapp.com"); // don't need a port for heroku!! / online servers
var client = ioc.connect( "http://localhost:" + 3000 );

// osc
var osc = require('node-osc');
var oscIP = '127.0.0.1'; // IP of UE4
var oscPort = 3333; // port for UE4
var oscClient = new osc.Client(oscIP, oscPort);


client.once( "connect", function () {
    // console.log( 'Client: Connected to port ' + port );

    client.emit( "echo", "Hello World", function ( message ) {
        console.log( 'Echo received: ', message );
        // client.disconnect();
    } );
    //
    // client.on('bounce', function (data) {
    //   console.log(data);
    // });

    client.on('message', function(data) {
      console.log(data);
      // io.sockets.emit('response', 'hello world'); // send to client socket

      io.sockets.emit('post', data);          // send to client socket
      oscClient.send('/chat/message', data);  // send to osc host@port

    });


} );
