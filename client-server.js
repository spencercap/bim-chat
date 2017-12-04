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

      if (data.type == 'c') {

        if (data.button == 'this') {
          oscClient.send('/choice/'+ data.value, data.score[0]);
        }
        else if (data.button == 'that') {
          oscClient.send('/choice/'+ data.value, data.score[1]);
        }
        else {
          console.log('bad button on data type c');
        }

      }

      else if (data.type == 'm') {
        oscClient.send('/message/value', "\""+data.value+"\"");  // send to osc host@port
      }
      else {
        console.log('bad data type, not a c or m');
      }
    });


    ioClient.on('changeP', function (data) {
      // console.log(data);
      if (data.type == 'q') {
        oscClient.send('/prompt/q', "\""+data.value+"?\"");  // send to osc host@port
      }
      else if (data.type == 'tt') {
        oscClient.send('/prompt/tt', "\""+data.value+"?\"");  // send to osc host@port
      }
      else {
        console.log('bad type for a prompt change');
      }
    });

});
