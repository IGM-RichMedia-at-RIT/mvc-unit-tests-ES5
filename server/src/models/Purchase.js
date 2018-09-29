/** Purchase model not implemented yet
    Instead we will stub the responses.
    This is just a mock class for testing that presumes the real models
    have not been completed yet. Maybe mongo is not yet set up or the person
    coding the models is not ready yet.
**/

//Empty function for adding functions/prototype functions
var PurchaseModel = function() {

};

//Attach a save function to the PurchaseModel prototype
//so that all PurchaseModel objects can call .save (like they would with a mongoose object)
PurchaseModel.prototype.save = function(callback) {
    //just return the callback with a null for testing
    //A mongoose object's save function calls back with an err field
    //The null represents the error, so this means there was no error.
    return callback(null);
};

//Attach a findByUsername function to the PurchaseModel
//This will allow us to call PurchaseModel.findByUsername (like they would be a mongoose model)
PurchaseModel.findByUsername = function(username, callback) {
    //Create a false document with valid data
    var obj = {
        username: username,
        price: 20.00
    };
    
    //Send it back. We will assume the return from this function is err, document
    //The null means there was no error and the object represents an object we would have found
    return callback(null, obj);
};

//Export the model
module.exports.PurchaseModel = PurchaseModel;