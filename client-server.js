// osc
var osc = require('node-osc');
var oscIP = '127.0.0.1'; // IP of UE4
var oscPort = 8000; // port for UE4
var oscClient = new osc.Client(oscIP, oscPort);


// io (fake client in backend)
var ioc = require('socket.io-client');
var ioPort = 3000; // for local testing
var ioClient = ioc.connect('https://bim-chat.herokuapp.com'); // don't need a port for heroku!! / online servers
// var ioClient = ioc.connect('http://localhost:' + ioPort ); // for local testing


ioClient.once('connect', function () {
    console.log('connected and running...\ncheck for osc on: ' + oscIP + ' port: ' + oscPort);

    ioClient.on('post', function (data) {
      console.log(data);
      oscClient.send('/chat/message', data);  // send to osc host@port
    });

    // client.on('bounce', function (data) {
    //   console.log(data);
    // });
});
