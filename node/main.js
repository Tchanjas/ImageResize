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
  // use the /images location for the files in www/images
  app.use('/images', express.static(path.join(__dirname, 'www/images')));
  // use the /images location for the files in www/images
  app.use('/css', express.static(path.join(__dirname, 'www/css')));
  // use the / location for the files in www
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
    var angle = parseInt(req.query.angle);
    var flip = req.query.flip;
    var flop = req.query.flop;
    var sharpen = req.query.sharpen;
    var blur = req.query.blur;
    var negate = req.query.negate;
    var normalize = req.query.normalize;

    // if url, width or height are not defined return resize.html
    if(typeof url==='undefined' || url==='' || 
    typeof width==='undefined' || isNaN(width) ||
    typeof height==='undefined' || isNaN(height)) {
      res.redirect( "/resize.html" );
    } else {
      // try to it, if it fails return resized.html
      try {
        // try to decode the base64 string
        var urlDecode = new Buffer(url, 'base64').toString("ascii");
        var image = sharp().resize(width, height);

        // if the user has specified an angle check if it's 0, 90, 180 or 270
        // then rotate it
        if(typeof angle!=='undefined' && !isNaN(angle)) {
          if(angle == 0 || angle == 90 || angle == 180 || angle == 270) {
            image.rotate(angle);
          }
        }
        // check if the flip was checked
        // then flip it
        if(flip == "on") {
          image.flip();
        }
        // check if the flop was checked
        // then flop it
        if(flop == "on") {
          image.flop();
        }
        // check if the sharpen was checked
        // then sharpen it
        if(sharpen == "on") {
          image.sharpen();
        }
        // check if the blur was checked
        // then blur it
        if(blur == "on") {
          image.blur();
        }
        // check if the negate was checked
        // then negate it
        if(negate == "on") {
          image.negate();
        }
        // check if the normalize was checked
        // then normalize it
        if(normalize == "on") {
          image.normalize();
        }
        request.get(urlDecode).pipe(image).pipe(res);
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
