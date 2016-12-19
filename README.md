# Image resize

A simple high performance web based system running Node.js and NGINX to resize a image.


## Architecture

We use three VMs with CentOS 7. One with NGINX for load balancing and caching and the other two as Node.js servers.

### Features

* [x] Resize images
* [x] Multithread
* [x] Load Balacing
* [x] Caching
* [ ] Watermarking
* [ ] Pretty interface and landing page

### Notes

The file main.js is for Node.js, the files default.conf and nginx.conf are for NGINX.

Use 'setenforce 0' if 'service nginx restart' gives you an error.
