cluster = require('cluster');
var numCPU = require('os').cpus().length;

if (cluster.isMaster) {
  for (var i = 0; i < numCPU; i++) {
    cluster.fork();
  }
} else {
  var express = require('express');
  var request = require('request');
  var sharp = require('sharp');

  var app = express();

  app.get('/', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
  })

  app.get('/index.html', function (req, res) {
     res.sendFile( __dirname + "/" + "index.html" );
  })

  app.get('/resize', function(req, res) {
    var url = new Buffer(req.query.url, 'base64').toString("ascii");
    var width = parseInt(req.query.width);
    var height = parseInt(req.query.height);
    request.get(url).pipe(sharp().resize(width, height)).pipe(res);
  });

  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
}
