var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile('index.html');
  // res.send('this is the express test...');
  console.log('working');
});

app.listen(process.env.PORT || 3000);
