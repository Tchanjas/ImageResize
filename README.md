# Image resize

A simple high performance web based system running Node.js and NGINX to resize images.


## Architecture

We use three VMs with CentOS 7. One with NGINX for load balancing and caching and the other two as Node.js servers.

Using [sharp](https://github.com/lovell/sharp), a high performance Node.js image processing, the fastest module to resize JPEG, PNG, WebP and TIFF images. Uses the libvips library.


### How To

The folder node is for each Node.js server, we can run the server by doing `node node/main.js`.

The folder nginx is for the NGINX, we can run it by doing `sudo service nginx start`:
* The file default.conf should be `/etc/nginx/conf.d`.
* The file nginx.conf should be `/etc/nginx/`.
* Use `setenforce 0` if `service nginx start` gives you an error.


### Features

* [x] Resize images
* [x] Multithread
* [x] Load Balacing
* [x] Caching
* [x] Pretty interface and landing page
* [x] Rotation
* [x] Flip
* [x] Flop
* [x] Sharpen
* [x] Blur
* [x] Negate
* [x] Normalize