var nock = require('nock');

nock.recorder.rec();

const user = "admin@s3pweb.com";
const password = "admin";

var LoopbackClient = require("../src");

var getToken = async () => {

    try {
        var loopbackClient = new LoopbackClient(
            "http://localhost:13000/api",
            user,
            password
          );
        
          console.log("loopbackClient", loopbackClient);
        
          var token = await loopbackClient.createToken();
        
          console.log("token=", token);      
    } catch (error) {
        console.log('error=',error)
    }
  
};

getToken()