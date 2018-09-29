var controllers = require('./controllers'); //pull in controllers

//Custom router function
//This will be called any time the HTTP server receives a request
//Node will automatically make req,res and pass them in
function onRequest(req, res) {

  //convert the request URL to lowercase (just in case they used capitals
  //req.url is what comes after the domain
  //For example, the req.url for www.example.com/main would be "/main"
  var url = req.url.toLowerCase(); 
  
  //check the url so we can call an appropriate router
  switch(url) {
    case "/": //if the / page
        return controllers.make(req, res); //call controllers.make
    case "/find": //if the /find page
        return controllers.find(req, res); //call controllers.find
    default: //if anything else
        return controllers.notFound(req, res); //call controllers.notFound
  }
}

//Export onRequest as the entire export for this module
module.exports = onRequest;