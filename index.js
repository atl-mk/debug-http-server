#! /usr/bin/env node

/* whatever the original license is based on
  https://gist.githubusercontent.com/coryalder/1198525/raw/e28a1086e4624014b7c5411edf83a3fb350e43fa/debugserver.js
  https://gist.github.com/coryalder/1198525/e28a1086e4624014b7c5411edf83a3fb350e43fa
*/

import { createServer } from 'http';

const PORT = 3030;
const HOSTNAME = '127.0.0.1';

var echoStore = ''; // put initial value here, will be replaced with the contents of any put or post request.

createServer(function (req, res) {
  var data = '';

  req.on('data', function (chunk) {
    data += chunk;
  });

  req.on('end', function () {
    console.log(`Received HTTP ${req.httpVersion} ${req.method} request ${req.url} headers ${JSON.stringify(req.headers)}`);
    if (req.method !== "GET") {
      echoStore = data; // save the data.
    }
  });

  // on post or put, redirect to a GET of the same resource (this is RESTful behaviour)
  // if (request.method == "POST" || request.method == "PUT") {
  //   console.log("Post request, sending redirect in res");
  //   res.writeHead(301, {'Location': request.url});
  //   res.end('');
  //   return;
  // }

  res.writeHead(200, {'Content-Type': 'application/json'}); // change this if your service outputs xml or html.
  res.end(echoStore);
}).listen(PORT, HOSTNAME);


console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
