const apiUrl = "http://localhost:13000";

const nockMode = process.env.NOCK;

if (nockMode) {
  var nock = require("nock");

  if (nockMode == "record") {
    const fs = require("fs-extra");

    var recordNameFile = "record.txt";

    fs.writeFile(recordNameFile, "");

    var appendLogToFile = async content => {
      await fs.appendFile(recordNameFile, content);
    };
    nock.recorder.rec({
      use_separator: false,
      logging: appendLogToFile
    });
  }
}

var test = require("ava");

const user = "user@mydomain.com";
const password = "admin";

var LoopbackClient = require("../src");

var loopbackClient, token;

if (nockMode == "play") { nock(apiUrl, {"encodedQueryParams":true})
.post('/api/users/login', {"email":"user@mydomain.com","password":"admin"})
.reply(200, {"id":"tNR8S54Mku6c0Rr4UsF5zpBpxGosA6BG9eG5HJhOpvTkEdYrMhxTroQj6Mk9srPR","ttl":1209600,"created":"2018-08-03T09:11:13.458Z","userId":"5b641b01c3102d00181086b9"});
  
  }

test.before(async t => {
  console.log("before test");
  loopbackClient = new LoopbackClient(apiUrl + "/api", user, password);

  loopbackClient.setCustomLoginPath("/users/login");

  
    token = await loopbackClient.createToken();

    console.log("token=", token);
  
});

/* --------------------------*/
/* TEST login
/* --------------------------*/

if (nockMode == "play") {
 
nock(apiUrl, {"encodedQueryParams":true})
.post('/api/users/login', {"email":"user@mydomain.com","password":"admin"})
.reply(200, {"id":"tNR8S54Mku6c0Rr4UsF5zpBpxGosA6BG9eG5HJhOpvTkEdYrMhxTroQj6Mk9srPR","ttl":1209600,"created":"2018-08-03T09:11:13.458Z","userId":"5b641b01c3102d00181086b9"});
  
  }

test("login", async t => {
  //await start(t.title)

  let _token1 = await loopbackClient.createToken();
  t.is(token, _token1);
 
});

/* --------------------------*/
/* TEST login-badPath
/* --------------------------*/

if (nockMode == "play") {
 
nock(apiUrl, {"encodedQueryParams":true})
.post('/api/users/logins', {"email":"user@mydomain.com","password":"admin"})
.reply(404, {"error":{"statusCode":404,"name":"Error","message":"Shared class  \"users\" has no method handling POST /logins"}});

}

test("login-badPath", t => {
  loopbackClient = new LoopbackClient(apiUrl + "/api", user, password);

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

/* --------------------------*/
/* TEST CREATE METHOD
/* --------------------------*/

if (nockMode == "play") {
  nock(apiUrl, { encodedQueryParams: true })
    .post("/api/sms", { token: "string", cellularNumber: "string" })
    .reply(200, {
      token: "string",
      cellularNumber: "string",
      id: "5b641399e43cf2001c92e5e0",
      shortId: "SkFl6XWJrQ",
      creationDate: "2018-08-03T08:34:33.057Z",
      lastModificationDate: "2018-08-03T08:34:33.057Z"
    });

    nock(apiUrl, { encodedQueryParams: true })
    .get("/api/sms/count")
    .reply(200, { count: 1 });
}

test("create and count", async t => {
  console.log("in create");

  let SMS = loopbackClient.getModel("sms");

  let sms = await SMS.create({
    token: "string",
    cellularNumber: "string"
  });

  t.is(true, sms.id.length > 0);

  let nbSms = await SMS.count();

  t.is(true, nbSms.count > 0);

});

/* --------------------------*/
/* TEST FIND METHOD
/* --------------------------*/

if (nockMode == "play") {
  nock(apiUrl, { encodedQueryParams: true })
    .get("/api/sms")
    .delayConnection(1000)
    .reply(200, [
      {
        token: "string",
        cellularNumber: "string",
        id: "5b6417bd53307e00181e8827",
        shortId: "H1KTovcbB7",
        creationDate: "2018-08-03T08:52:13.893Z",
        lastModificationDate: "2018-08-03T08:52:13.893Z"
      }
    ]);

    test("find timeout", async t => {
      let SMS = loopbackClient.getModel("sms");
    
    
       const error = await t.throws(SMS.find({},{timeout: 500}));
       t.is(error.message, 'network timeout at: '+apiUrl+'/api/sms');
     
    });

}



/* --------------------------*/
/* TEST FIND METHOD
/* --------------------------*/

if (nockMode == "play") {
  nock(apiUrl, { encodedQueryParams: true })
    .get("/api/sms")
    .delayConnection(1000)
    .reply(200, [
      {
        token: "string",
        cellularNumber: "string",
        id: "5b6417bd53307e00181e8827",
        shortId: "H1KTovcbB7",
        creationDate: "2018-08-03T08:52:13.893Z",
        lastModificationDate: "2018-08-03T08:52:13.893Z"
      },
      {
        token: "string",
        cellularNumber: "string",
        id: "5b6417c753307e00181e8828",
        shortId: "H1KTovcbB7",
        creationDate: "2018-08-03T08:52:23.916Z",
        lastModificationDate: "2018-08-03T08:52:23.916Z"
      },
      {
        token: "string",
        cellularNumber: "string",
        id: "5b6417d153307e00181e8829",
        shortId: "H1KTovcbB7",
        creationDate: "2018-08-03T08:52:33.401Z",
        lastModificationDate: "2018-08-03T08:52:33.401Z"
      },
      {
        token: "string",
        cellularNumber: "string",
        id: "5b64180e53307e00181e882a",
        shortId: "H1KTovcbB7",
        creationDate: "2018-08-03T08:53:34.437Z",
        lastModificationDate: "2018-08-03T08:53:34.437Z"
      }
    ]);

  nock(apiUrl, { encodedQueryParams: true })
    .get("/api/sms/5b6417bd53307e00181e8827")
    .reply(200, {
      token: "string",
      cellularNumber: "string",
      id: "5b6417bd53307e00181e8827",
      shortId: "H1KTovcbB7",
      creationDate: "2018-08-03T08:52:13.893Z",
      lastModificationDate: "2018-08-03T08:52:13.893Z"
    });
}

test("find", async t => {
  let SMS = loopbackClient.getModel("sms");

  let smsArray = await SMS.find({},{timeout: 1500}); 

  t.is(true, smsArray.length > 0);

  let sms = await SMS.findById(
    { id: smsArray[0].id },
    { headers: { toto: "toto" } }
  );

  t.is(JSON.stringify(sms), JSON.stringify(smsArray[0]));
});

/* --------------------------*/
/* TEST ADD HEADER PARAMS
/* --------------------------*/

if (nockMode == "play") {
  nock('http://localhost:13000', {"encodedQueryParams":true})
  .matchHeader('toto', 'tata')
  .get('/api/sms/findOne')
  .reply(200, {"token":"string","cellularNumber":"string","id":"5b6421eec2306e001ce8724d","shortId":"B1t5jbjWBX","creationDate":"2018-08-03T09:35:42.167Z","lastModificationDate":"2018-08-03T09:35:42.167Z"});
}

test("customHeader", async t => {
  let SMS = loopbackClient.getModel("sms");

  let smsArray = await SMS.findOne({},{headers:{toto:'tata'}}); 

  t.is(true, Object.keys(smsArray).length > 0);
 
});

