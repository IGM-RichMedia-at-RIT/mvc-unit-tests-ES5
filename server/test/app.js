//chai.js is an assertion library with many functions/features for testing values
//Chai gives you access to the keywords 'should', 'expect', 'equal', 'not', 'to', 'be', 'an' and many more
var should = require('chai').should();

//pull in our test config
//in our case this pulls in the environment variable, but it can be used for many other things
var config = require('./test_config.js');

//The describe function allows you to group a series of tests by name to run asynchronously 
//You can use multiple describes and you can use describes inside of describes
//The describe function is merely a grouping function for running tests
//It is required, but it is mostly there for the literal purpose of describing a test set 
//to the developer.
describe("server", function() {

    //The it function is a test case that explains what this individual test does
    //and provides a callback for successful completion. 
    //The it function is required for each test case and is asynchronous
    //You can have as many it functions in a describe as you need to test
    //Upon completion, call the done function
    //Upon failure throw an error (automatically handled by chai
    it("should start up the server", function(done) {
        //pull in our app. Our app exports 'app' as a global when in a test environment
        //We do this because global properties of an object do not get passed in modules
        //Instead we need to put the whole app into the global scope for testing
        require('../src/app.js');
        
        //app is global from server
        //Chai's should keyword allows you to chain many different types of testing 
        //to see what a value SHOULD be. Chai's expect keyword is very similar in function, just grammatically different.
        //You can grab any variable and apply should or expect to it. 
        //Then you can chain other functions together to check for a specific value
        //These other chai functions are intended to be quite literal and sometimes do nothing except for
        //explain purpose to the developer
        app.should.not.be.an('undefined');
        
        //UPON SUCCESSFUL COMPLETION, YOU MUST CALL THE DONE CALLBACK FROM THIS IT FUNCTION
        done();
    });

});