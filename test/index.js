// var nock = require('nock');
// var fs = require('fs')

// var appendLogToFile = function(content) {
//     fs.appendFile('record.txt', content);
//   }
//   nock.recorder.rec({
//     use_separator: false,
//     logging: appendLogToFile,
//   });

var test = require("ava");

const user = "admin@s3pweb.com";
const password = "admin";

var LoopbackClient = require("../src");

var loopbackClient,token;

test.before(async t => {
  loopbackClient = new LoopbackClient(
    "http://localhost:13000/api",
    user,
    password
  );

  loopbackClient.setCustomLoginPath("/users/login");

  token = await loopbackClient.createToken();

  console.log("token=", token);
});

test("login", async t => {   
  
    let _token = await loopbackClient.createToken()
    t.is(token,_token)

  });

test("login-badPath", t => {
  loopbackClient = new LoopbackClient(
    "http://localhost:13000/api",
    user,
    password
  );

  loopbackClient.setCustomLoginPath("/users/logins");

  loopbackClient.setHeaders({
    "Content-Type": "application/json",
    Accept: "application/json"
  });

  return loopbackClient.createToken().catch(reason => {
    console.log(reason);
    t.is("Not Found", reason.message);
  });
});

test("create", async t => {
  let SMS = loopbackClient.getModel("sms");

  let sms = await SMS.create({
    token: "string",
    cellularNumber: "string"
  });

  t.is(true, sms.id.length > 0);
});

test("find", async t => {
  let SMS = loopbackClient.getModel("sms");

  let smsArray = await SMS.find();

  t.is(true, smsArray.length > 0);

  let sms = await SMS.findById({id: smsArray[0].id})

  t.is(JSON.stringify(sms),JSON.stringify(smsArray[0]))
});

test("count", async t => {
  let SMS = loopbackClient.getModel("sms");

  let nbSms = await SMS.count();

  t.is(true, nbSms.count > 0);
});
