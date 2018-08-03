var nock = require("nock");

// nock.recorder.rec();

const user = "user@mydomain.com";
const password = "admin";

var LoopbackClient = require("../src");
var loopbackClient

var getToken = async () => {
  try {
    loopbackClient = new LoopbackClient(
      "http://toto.requestcatcher.com/"
    );

    console.log("loopbackClient", loopbackClient);

    //   var token = await loopbackClient.createToken();
  } catch (error) {
    console.log("error=", error);
  }
};

getToken().then(async () => {
  let SMS = loopbackClient.getModel("test");

  let smsArray = await SMS.find(
    {},
    { headers: { "User-Agent": "toto", rty: 15 } }
  );
});
