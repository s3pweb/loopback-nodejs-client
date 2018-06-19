var test = require('tape')
var LoopbackClient = require('../src')

// to test the es6 version
//import test from "tape"
//import LoopbackClient from "../src"


const user = 'stephane.guilly@gmail.com'
const password = 'xxxx'

var nock = require('nock');

//nock.recorder.rec();

var loopbackClient;

var idCustomer;


test("token", (t) => {
   t.plan(1)

  nock('http://localhost:42001', {
    "encodedQueryParams":true,
    "reqheaders": {
      'x-testheader': 'yes'
    }
    })
    .post('/api/users/login', {"email":user,"password":password})
    .query({"include":"user"})
    .reply(200,
      {"id":"aieLGPjVF3hAJmQivH74FvqEbuzpteqfJ30NC1mtWvgMA584GD35fQ6BLoMNh6Ds",
        "ttl":1209600,
        "created":"2017-01-03T12:51:41.687Z",
        "userId":"5752f3cde8e5812c2592eebb",
      }, [ 'Vary',
        'Origin, Accept-Encoding',
        'Access-Control-Allow-Credentials',
        'true',
        'X-XSS-Protection',
        '1; mode=block',
        'X-Frame-Options',
        'DENY',
        'X-Download-Options',
        'noopen',
        'X-Content-Type-Options',
        'nosniff',
        'Content-Type',
        'application/json; charset=utf-8',
        'Content-Length',
        '915',
        'ETag',
        'W/"393-wbs82x3xuxWwFOsv4/Atdw"',
        'Date',
        'Tue, 03 Jan 2017 12:51:41 GMT',
        'Connection',
        'close' ]);

  loopbackClient = new LoopbackClient('http://localhost:42001/api',user,password);
  loopbackClient.setHeaders({'x-testheader': 'yes'})
   console.log('loopbackClient',loopbackClient)

  loopbackClient.createToken().then((token)=>{
    console.log('token=',token)

    t.equal(true,token.length > 0)
  })

})

test("create", (t) => {
  t.plan(1)

  nock('http://localhost:42001', {"encodedQueryParams":true})
    .post('/api/customers', {"name":"ido4pro","city":"plougonvelin"})
    .reply(200, {"name":"ido4pro","id":"586b9fe866a6ea6347c290ae","city":"plougonvelin"}, [ 'Vary',
      'Origin, Accept-Encoding',
      'Access-Control-Allow-Credentials',
      'true',
      'X-XSS-Protection',
      '1; mode=block',
      'X-Frame-Options',
      'DENY',
      'X-Download-Options',
      'noopen',
      'X-Content-Type-Options',
      'nosniff',
      'Content-Type',
      'application/json; charset=utf-8',
      'Content-Length',
      '72',
      'ETag',
      'W/"48-c0ddKdkGIDvb+MDPRWRwmg"',
      'Date',
      'Tue, 03 Jan 2017 12:58:16 GMT',
      'Connection',
      'close' ]);

  var Customers = loopbackClient.getModel('customers')

  Customers.create({name: 'ido4pro', city: 'plougonvelin'})
    .then(function (customer) {


      t.equal('ido4pro',customer.name)

      idCustomer = customer.id

    })
    .catch(function (err) {
      console.log(err)
    })

})

test("find", (t) => {
  t.plan(1)

  nock('http://localhost:42001', {"encodedQueryParams":true})
    .get('/api/customers')
    .query(function(actualQueryObject){
      // do some compare with the actual Query Object
      // return true for matched
      // return false for not matched

      //var actualQueryObject = JSON.parse(query)

      console.log('actualQueryObject',actualQueryObject)

      

      return actualQueryObject.filter = '{"where":{"name":"ido4pro"}}' ? true : false  ;
    })
    .reply(200, [{"name":"ido4pro","id":idCustomer,"city":"plougonvelin"}], [ 'Vary',
      'Origin, Accept-Encoding',
      'Access-Control-Allow-Credentials',
      'true',
      'X-XSS-Protection',
      '1; mode=block',
      'X-Frame-Options',
      'DENY',
      'X-Download-Options',
      'noopen',
      'X-Content-Type-Options',
      'nosniff',
      'Content-Type',
      'application/json; charset=utf-8',
      'Content-Length',
      '585',
      'ETag',
      'W/"249-BIjYMpLoc7unccLIspFwog"',
      'Date',
      'Tue, 03 Jan 2017 13:09:54 GMT',
      'Connection',
      'close' ]);




  var Customers = loopbackClient.getModel('customers')


      Customers.find({filter: {where: {name: 'ido4pro'}}})
        .then(function (customers) {
          t.equal(true,customers.length > 0 )

        })
        .catch(function (err) {
          console.log(err)
        })

})

test("findOne", (t) => {
  t.plan(1)

  nock('http://localhost:42001', {"encodedQueryParams":true})
    .get('/api/customers/findOne')
    .query(function(actualQueryObject){
      // do some compare with the actual Query Object
      // return true for matched
      // return false for not matched

      console.log('actualQueryObject',actualQueryObject)
      return actualQueryObject.filter = '{"where":{"name":"ido4pro"}}' ? true : false  ;
    })
    .reply(200, {"name":"ido4pro","id":idCustomer,"city":"plougonvelin"}, [ 'Vary',
      'Origin, Accept-Encoding',
      'Access-Control-Allow-Credentials',
      'true',
      'X-XSS-Protection',
      '1; mode=block',
      'X-Frame-Options',
      'DENY',
      'X-Download-Options',
      'noopen',
      'X-Content-Type-Options',
      'nosniff',
      'Content-Type',
      'application/json; charset=utf-8',
      'Content-Length',
      '585',
      'ETag',
      'W/"249-BIjYMpLoc7unccLIspFwog"',
      'Date',
      'Tue, 03 Jan 2017 13:09:54 GMT',
      'Connection',
      'close' ]);




  var Customers = loopbackClient.getModel('customers')


  Customers.findOne({filter: {where: {name: 'ido4pro'}}})
  //Customers.findOne({where: {name: 'ido4pro'}})
    .then(function (customer) {
      t.equal(true,customer.name == 'ido4pro' )

    })
    .catch(function (err) {
      console.log(err)
    })

})

test("findById", (t) => {
  t.plan(1)

  nock('http://localhost:42001', {"encodedQueryParams":true})
    .get('/api/customers/'+idCustomer)
    .reply(200, {"name":"ido4pro","id":idCustomer,"city":"plougonvelin"}, [ 'Vary',
      'Origin, Accept-Encoding',
      'Access-Control-Allow-Credentials',
      'true',
      'X-XSS-Protection',
      '1; mode=block',
      'X-Frame-Options',
      'DENY',
      'X-Download-Options',
      'noopen',
      'X-Content-Type-Options',
      'nosniff',
      'Content-Type',
      'application/json; charset=utf-8',
      'Content-Length',
      '72',
      'ETag',
      'W/"48-c0ddKdkGIDvb+MDPRWRwmg"',
      'Date',
      'Tue, 03 Jan 2017 13:24:00 GMT',
      'Connection',
      'close' ]);

  var Customers = loopbackClient.getModel('customers')


  Customers.findById({ id: idCustomer})
    .then(function (customer) {
      t.equal(true,customer.name == 'ido4pro')

    })
    .catch(function (err) {
      console.log(err)
    })

})


test("updateById", (t) => {
  t.plan(1)

  nock('http://localhost:42001', {"encodedQueryParams":true})
    .put('/api/customers/'+idCustomer, {"city":"brest"})
    .reply(200, {"name":"ido4pro","id":idCustomer,"city":"brest"}, [ 'Vary',
      'Origin, Accept-Encoding',
      'Access-Control-Allow-Credentials',
      'true',
      'X-XSS-Protection',
      '1; mode=block',
      'X-Frame-Options',
      'DENY',
      'X-Download-Options',
      'noopen',
      'X-Content-Type-Options',
      'nosniff',
      'Content-Type',
      'application/json; charset=utf-8',
      'Content-Length',
      '65',
      'ETag',
      'W/"41-c4/OB+yDE5yGjChOibGgTw"',
      'Date',
      'Wed, 04 Jan 2017 09:13:39 GMT',
      'Connection',
      'close' ]);



  var Customers = loopbackClient.getModel('customers')


  Customers.updateById(idCustomer,{city: 'brest'})
    .then(function (customer) {
      t.equal(true,customer.city == 'brest')

    })
    .catch(function (err) {
      console.log(err)
    })

})

test("updateAll", (t) => {
  t.plan(1)

  nock('http://localhost:42001', {"encodedQueryParams":true})
    .post('/api/customers/update', {"city":"nantes"})
    .query(function(actualQueryObject){
      // do some compare with the actual Query Object
      // return true for matched
      // return false for not matched

      console.log('actualQueryObject',actualQueryObject)
      return actualQueryObject.where = '{"name":"ido4pro"}' ? true : false  ;
    })
    .reply(200, {"count":1}, [ 'Vary',
      'Origin, Accept-Encoding',
      'Access-Control-Allow-Credentials',
      'true',
      'X-XSS-Protection',
      '1; mode=block',
      'X-Frame-Options',
      'DENY',
      'X-Download-Options',
      'noopen',
      'X-Content-Type-Options',
      'nosniff',
      'Content-Type',
      'application/json; charset=utf-8',
      'Content-Length',
      '12',
      'ETag',
      'W/"c-d07cdU1Uym2u//VIRStBDQ"',
      'Date',
      'Wed, 04 Jan 2017 16:19:16 GMT',
      'Connection',
      'close' ]);



  var Customers = loopbackClient.getModel('customers')


  Customers.updateAll({where:{name:'ido4pro'}},{city: 'nantes'})
    .then(function (value) {
      t.equal(true,value.count > 0)

    })
    .catch(function (err) {
      console.log(err)
    })

})

test("delete", (t) => {
  t.plan(1)

  nock('http://localhost:42001', {"encodedQueryParams":true})
    .delete('/api/customers/'+idCustomer)
    .reply(200, {"count":1}, [ 'Vary',
      'Origin, Accept-Encoding',
      'Access-Control-Allow-Credentials',
      'true',
      'X-XSS-Protection',
      '1; mode=block',
      'X-Frame-Options',
      'DENY',
      'X-Download-Options',
      'noopen',
      'X-Content-Type-Options',
      'nosniff',
      'Content-Type',
      'application/json; charset=utf-8',
      'Content-Length',
      '11',
      'ETag',
      'W/"b-CxuxFwe2mm4IC62zgWSn6Q"',
      'Date',
      'Tue, 03 Jan 2017 13:31:19 GMT',
      'Connection',
      'close' ]);


  var Customers = loopbackClient.getModel('customers')


  Customers.deleteById(idCustomer)
    .then(function (value) {
      t.equal(true,value.count == 1)

    })
    .catch(function (err) {
      console.log(err)
    })

})


test("upsertWithWhere", (t) => {
  t.plan(1)

  nock('http://localhost:42001', {"encodedQueryParams":true})
    .post('/api/customers/upsertWithWhere', {"city":"nantes"})
    .query(function(actualQueryObject){
      // do some compare with the actual Query Object
      // return true for matched
      // return false for not matched

      console.log('actualQueryObject',actualQueryObject)
      return actualQueryObject.where= '{"name":"ido4pro"}' ? true : false  ;
    })
    .reply(200, {"count":1}, [ 'Vary',
      'Origin, Accept-Encoding',
      'Access-Control-Allow-Credentials',
      'true',
      'X-XSS-Protection',
      '1; mode=block',
      'X-Frame-Options',
      'DENY',
      'X-Download-Options',
      'noopen',
      'X-Content-Type-Options',
      'nosniff',
      'Content-Type',
      'application/json; charset=utf-8',
      'Content-Length',
      '12',
      'ETag',
      'W/"c-d07cdU1Uym2u//VIRStBDQ"',
      'Date',
      'Wed, 04 Jan 2017 16:19:16 GMT',
      'Connection',
      'close' ]);



  var Customers = loopbackClient.getModel('customers')


  Customers.upsertWithWhere({where:{name:'ido4pro'}},{city: 'nantes'})
    .then(function (value) {
      t.equal(true,value.count > 0)

    })
    .catch(function (err) {
      console.log(err)
    })

})