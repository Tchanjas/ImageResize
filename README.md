# Image resize

A simple high performance web based system running Node.js and NGINX to resize images.


## Architecture

We use three VMs with CentOS 7. One with NGINX for load balancing and caching and the other two as Node.js servers.

Using [sharp](https://github.com/lovell/sharp), a high performance Node.js image processing, the fastest module to resize JPEG, PNG, WebP and TIFF images. Uses the libvips library.

### Features

* [x] Resize images
* [x] Multithread
* [x] Load Balacing
* [x] Caching
* [x] Pretty interface and landing page
* [ ] Watermarking
* [ ] Rotation

### Notes

The file main.js is for Node.js, the files default.conf and nginx.conf are for NGINX.

Use 'setenforce 0' if 'service nginx restart' gives you an error.
