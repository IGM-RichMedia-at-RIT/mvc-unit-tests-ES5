//supertest is an HTTP request/response testing library. This allows you to fake HTTP requests and check the results
//easily. This will allow you to do HTTP requests (get, post, etc), AJAX requests, etc. It returns you the response
//so that you know if the routes and values are working correctly. This saves you a lot of time testing the routes
//and client side
var request = require('supertest');
//sinon is a mock/stubbing library that allows you to manipulate the return values from objects, functions and callback
//to force a value for testing. This is used to push code down an error handling path when it normally would be avoided
//so that you can test the error handling path
var sinon = require('sinon');
//chai.js is an assertion library with many functions/features for testing values
//Chai gives you access to the keywords 'should', 'expect', 'equal', 'not', 'to', 'be', 'an' and many more
var should = require('chai').should();
//pull in our test config
//in our case this pulls in the environment variable, but it can be used for many other things
var config = require('../test_config.js');
//pull in the fake models so that we can mock it for testing against what the app should expect
//We will use sinon to stub responses from the model so that we know the controller works
//It is highly possible that you may be working on a part of the code while someone else works on the rest
//If you are ahead of the other person, you will need to stub the returns from the other persons code
//so you can make sure your code works even though the other code is not finished. 
//Stubbing lets you fake return values so you can test code that is not finished or could cause errors
var models = require('../../src/models');
//Just aliasing the PurchaseModel for reference
var PurchaseModel = models.Purchase.PurchaseModel;

//The describe function allows you to group a series of tests by name to run asynchronously 
//You can use multiple describes and you can use describes inside of describes
//The describe function is merely a grouping function for running tests
//It is required, but it is mostly there for the literal purpose of describing a test set 
//to the developer.
describe('controller', function() {
    
    //Function to test an HTTP response from supertest to make sure the return value was of type text/plain
    //We will check the headers from the supertest response
    var expectPlainText= function(res) {
        res.header['content-type'].should.equal('text/plain');
    };

    //Describe for grouping the tests for the make page
    describe('make', function() {
    
        //describe for grouping a successful make page call
        describe('successful make', function() {
    
            //The it function is a test case that explains what this individual test does
            //and provides a callback for successful completion. 
            //The it function is required for each test case and is asynchronous
            //You can have as many it functions in a describe as you need to test
            //Upon completion, call the done function
            //Upon failure throw an error (automatically handled by chai
            
            //Tests to make sure a 200 status code returns upon going to the make page
            it('should return a 200', function(done) {
            
                //Call supertest (aliased to request) and make a get request to the '/' page
                //Supertest will create an HTTP GET request to '/'. Supertest can also support
                //query parameters and POSTING bodies/forms
                request(app).get('/')
                .expect(200) //expect a 200 status code back from the server for this page
                .expect(expectPlainText) //call our function to expect a plaintext response
                .end(done);    //on end, call the done function to say this test is complete
            });
        
        });
        
        //describe for grouping a failed make page call
        //This will group our before, after and it functions
        describe('failed make', function() {
        
            //variable to hold our stubbed function
            //This will be used to store a function with a forced return value
            //and to restore the original when we are done
            var stub;
        
            //The before function runs BEFORE a test or series of tests starts to set up the test cases
            //There are also functions like beforeEach and afterEach
            before(function() {
                //create a stub of the PurchaseModel.prototype and manipulate the save function
                stub = sinon.stub(PurchaseModel.prototype, 'save');
                //create an error to be forced back from the save function
                var err = new Error("Could not save document");
                //force the save function to return the specified error instead of its normal return value
                //The yields function calls the callback of the function and passes in these parameters to the callback
                //instead of the parameters that would normally go into the callback
                stub.yields(err); //force error            
            });
        
            //Test that a 500 error should return from make page
            //Normally this would not occur, but we need to test for when it does occur to make sure the server code
            //handles it correctly. Our stub will force this error to occur so that we can test it
            it('should return a 500', function(done) {
                
                //Call supertest (aliased to request) and make a get request to the '/' page
                //Supertest will create an HTTP GET request to '/'. Supertest can also support
                //query parameters and POSTING bodies/forms
                request(app).get('/')
                .expect(500) //expect a 500 error because we forced a server error to occur
                .expect(expectPlainText) //call our function to expect a plaintext response
                .end(done); //at the end call the done function to indicate this tests success
            });
            
            //The after function runs AFTER a test or series of tests to reset the test cases
            //This is used to undo things like stubbed or fake account or anything
            //There are also functions like beforeEach and afterEach
            after(function(){    
                //call our stubs restore method, which will restore the stubbed function to the original functionality
                //In our case, this returns the save function from the model to a success
                stub.restore();
            });
        });
    });
    
    //Describe for grouping the tests for the find page
    describe('find', function() {
    
        //describe for grouping a successful find page call
        describe('successful find', function(){

            //The it function is a test case that explains what this individual test does
            //and provides a callback for successful completion. 
            //The it function is required for each test case and is asynchronous
            //You can have as many it functions in a describe as you need to test
            //Upon completion, call the done function
            //Upon failure throw an error (automatically handled by chai
            
            //Tests to make sure a 200 status code returns upon going to the find page        
            it('should return a 200', function(done) {
                request(app).get('/find')
                .expect(200) //expect a 200 status code back from the server for this page
                .expect(expectPlainText) //call our function to check for a plaintext response
                .end(done); //on end call the done function to make the tests finish successfully
            });
        
        });

        //describe for grouping a failed find page call
        //This will group our before, after and it functions        
        describe('failed find', function() {

            //variable to hold our stubbed function
            //This will be used to store a function with a forced return value
            //and to restore the original when we are done        
            var stub;

            //The before function runs BEFORE a test or series of tests starts to set up the test cases
            //There are also functions like beforeEach and afterEach            
            before(function() {
                //create a stub of the PurchaseModel and manipulate the findByUsername function
                stub = sinon.stub(PurchaseModel, 'findByUsername');
                //force the findByUsername function to return not find anything but not give an error
                //The yields function calls the callback of the function and passes in these parameters to the callback
                //instead of the parameters that would normally go into the callback
                stub.yields(null, null); //force null object                
            });
            
            //Test that a 404 error should return from the find page
            //Normally this would not occur, but we need to test for when it does occur to make sure the server code
            //handles it correctly. Our stub will force this error to occur so that we can test it
            it('should return a 404', function(done) {
                request(app).get('/find')
                .expect(404) //expect a 200 status code back from the server for this page
                .expect(expectPlainText) //call our function to test for a plaintext response
                .end(done); //when finished, call done the tell our code that the test was successful
            });
            
            //The after function runs AFTER a test or series of tests to reset the test cases
            //This is used to undo things like stubbed or fake account or anything
            //There are also functions like beforeEach and afterEach
            after(function() 
                //call our stubs restore method, which will restore the stubbed function to the original functionality
                //In our case, this returns the findByUsername function from the model to a success
                stub.restore();
            });
            
        });
    });
    
    //describe for grouping default route tests   
    describe('default routes', function() {

        //Test that a 404 error should return from a non-existent page
        it('should return a 404', function(done) {
            //Call supertest (aliased to request) and make a get request a non-existent page
            //Supertest will create an HTTP GET request to a non-existent page
            request(app).get('/notFound') 
            .expect(404) //expect a 404 response code
            .expect(expectPlainText) //expect response to by of type plaintext
            .end(done); //when finished, call the done function to indicate test success  
        });
    });

});