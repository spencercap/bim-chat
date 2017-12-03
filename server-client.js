
//var port = 49102;
// var port = 3011;

var ioc = require( 'socket.io-client' );
var client = ioc.connect( "https://serverrr.herokuapp.com"); // don't need a port for heroku!! / online servers
// var client = ioc.connect( "http://localhost:" + port );


client.once( "connect", function () {
    // console.log( 'Client: Connected to port ' + port );

    client.emit( "echo", "Hello World", function ( message ) {
        console.log( 'Echo received: ', message );
        // client.disconnect();
        // server.close();
    } );

    client.on('bounce', function (data) {
      console.log(data);
    });


} );
