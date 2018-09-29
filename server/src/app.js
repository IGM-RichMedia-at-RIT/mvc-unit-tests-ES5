var http = require('http'); //pull in HTTP hosting module
var router = require('./router.js'); //pull in our router file

var port = 3000; //server port

var app = http.createServer(router).listen(port); //create HTTP server on our server port and route traffic to the router

console.log('server started on port ' + port);

//If in a test environment, export the app as a global so that it can be referenced/manipulated anywhere for testing
//We will use this in the unit tests to test the server and HTTP traffic
if(process.env.NODE_ENV === 'test') {
    global.app = app;
}

