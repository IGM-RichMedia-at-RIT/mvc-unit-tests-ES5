var models = require('../models'); //Require the models
var PurchaseModel = models.Purchase.PurchaseModel; //Alias the PurchaseModel from the module for convenience

//Controller for the make page
var make = function(req, res) {
    //create a new Purchase Model
    var purchase = new PurchaseModel();
    
    //Set the properties
    purchase.username = 'test';
    purchase.price = 10;
    
    //Call the save function (like we would with a mongoose object and expect a callback with an error field)
    purchase.save(function(err) {
    
        //If an error occurs, send back a 500 error 
        if(err) {
            return writeResponse(req, res, 500, "failed to add purchase");
        }
    
        //if success, send back a 200 status code for success
        writeResponse(req, res, 200, "purchase was added");
    });
};

//Controller for the find page
var find = function(req, res) {

    //Call the purchase model's findByUsername function to find user "test" 
    //The passed callback will expect an error field and document
    PurchaseModel.findByUsername("test", function(err, doc) {
        if(err || !doc) { //if there is an error or no matching document is found, return a 404 error
            return writeResponse(req, res, 404, "user was not found");
        }
        
        //If success, return a 200 error
        writeResponse(req, res, 200, "Purchase for " + doc.username + " was " + doc.price);
    });
    
};

//Controller for handling a non-existent page
var notFound = function(req, res) {
  //Write back a 404 error
  writeResponse(req, res, 404, "page not found");
};

//Function to manually write a response
//Accepts the request, response, error code to send and data to send
var writeResponse = function(req, res, code, data) {
    //set the response code to the passed in code and the type to plaintext
    res.writeHead(code, {"Content-Type": "text/plain"});
    //write the data
    res.write(data);
    //send the data back to the client
    res.end();
};

//export public properties
module.exports.make = make;
module.exports.find = find;
module.exports.notFound = notFound;