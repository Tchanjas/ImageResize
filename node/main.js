cluster = require('cluster');
var numCPU = require('os').cpus().length;

// multithread
if (cluster.isMaster) {
  for (var i = 0; i < numCPU; i++) {
    cluster.fork();
  }
} else {
  var express = require('express');
  var path = require('path');
  var request = require('request');
  var sharp = require('sharp');

  var app = express();
  app.use('/images', express.static(path.join(__dirname, 'www/images')));
  app.use('/css', express.static(path.join(__dirname, 'www/css')));
  app.use(express.static(path.join(__dirname, 'www')));

  // show index
  app.get('/', function (req, res) {
    res.sendFile( __dirname + "/index.html" );
  });

  app.get('/resize.html', function (req, res) {
    res.sendFile( __dirname + "/resize.html" );
  });

  // get resize.html or the image resized
  app.get('/resize', function(req, res) {
    var url = req.query.url;
    var width = parseInt(req.query.width);
    var height = parseInt(req.query.height);

    // if url, width or height are not defined return resize.html
    if(typeof url==='undefined' || url==='' || 
    typeof width==='undefined' || isNaN(width) ||
    typeof height==='undefined' || isNaN(height)) {
      res.redirect( "/resize.html" );
    } else {
      // try to decode the base64 string and present the image
      try {
        var urlDecode = new Buffer(url, 'base64').toString("ascii");
        request.get(urlDecode).pipe(sharp().resize(width, height)).pipe(res);
      }
      catch (e) {
        res.redirect( "/resize.html" );
      }
    }    
  });

  // 404 redirect to index
  app.use(function (req, res, next) {
    res.status(404).redirect( "/" );;
  });

  app.listen(3000, function () {
    console.log('Server running on port 3000!');
  });
}
