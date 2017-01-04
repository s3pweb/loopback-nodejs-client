<big><h1 align="center">loopback-nodejs-client</h1></big>

<p align="center">
  <a href="https://npmjs.org/package/loopback-nodejs-client">
    <img src="https://img.shields.io/npm/v/loopback-nodejs-client.svg?style=flat-square"
         alt="NPM Version">
  </a>

  <a href="https://coveralls.io/r/sguilly/loopback-nodejs-client">
    <img src="https://img.shields.io/coveralls/sguilly/loopback-nodejs-client.svg?style=flat-square"
         alt="Coverage Status">
  </a>

  <a href="https://travis-ci.org/sguilly/loopback-nodejs-client">
    <img src="https://img.shields.io/travis/sguilly/loopback-nodejs-client.svg?style=flat-square"
         alt="Build Status">
  </a>

  <a href="https://npmjs.org/package/loopback-nodejs-client">
    <img src="http://img.shields.io/npm/dm/loopback-nodejs-client.svg?style=flat-square"
         alt="Downloads">
  </a>

  <a href="https://david-dm.org/sguilly/loopback-nodejs-client.svg">
    <img src="https://david-dm.org/sguilly/loopback-nodejs-client.svg?style=flat-square"
         alt="Dependency Status">
  </a>

  <a href="https://github.com/sguilly/loopback-nodejs-client/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/loopback-nodejs-client.svg?style=flat-square"
         alt="License">
  </a>
</p>

<p align="center"><big>

</big></p>

> NodeJS client library with loopback SDK syntax


## Install

```sh
$ npm install --save loopback-nodejs-client
```


## Usage

### Without authentification

```js
var LoopbackClient = require('loopback-nodejs-client')

var loopbackClient = new LoopbackClient('http://localhost:3000/api');

var Customers = loopbackClient.getModel('customers')

Customers.create({name: 'ido4pro', city: 'plougonvelin'})
  .then(function (customer) {
    console.log(customer)

    Customers.find({filter: {where: {name: 'ido4pro'}}})
      .then(function (customers) {
        console.log(customers)

      })
      .catch(function (err) {
        console.log(err)
      })

    Customers.count({where: {name: 'ido4pro'}})
      .then(function (customers) {
        console.log(customers)

      })
      .catch(function (err) {
        console.log(err)
      })

  })
  .catch(function (err) {
    console.log(err)
  })
```

### With authentification

```js
var loopbackClientWithAuth = new LoopbackClient('http://localhost:3000/api','xxx EMAIL USER xxx', 'xxx PASSWORD xxx')

var Customers = loopbackClient.getModel('customers')

loopbackClient.createToken()
  .then(function()
  {
      
       Customers.count({where: {name: 'ido4pro'}})
            .then(function (customers) {
              console.log(customers)
      
            })
            .catch(function (err) {
              console.log(err)
            })
      
  })


```

## Methods
  
  create(data) --> data = { id: 'xxx', filter: {...} } (filter is optional)

  count(where) --> where = { where : {name: 'xxx'} }, where = { where: {and: [{name: 'xxx'},{city: 'xxx'}] 

  updateAll(where,data) 

  updateById(id,where)

  find(filter)
   
  findById(data)

  findOne(query)

  deleteById(id)
  
  
  Check the test/index.js for more usage
  

## License

MIT © [Stéphane GUILLY](http://github.com/sguilly)

[npm-url]: https://npmjs.org/package/loopback-nodejs-client
[npm-image]: https://img.shields.io/npm/v/loopback-nodejs-client.svg?style=flat-square

[travis-url]: https://travis-ci.org/sguilly/loopback-nodejs-client
[travis-image]: https://img.shields.io/travis/sguilly/loopback-nodejs-client.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/sguilly/loopback-nodejs-client
[coveralls-image]: https://img.shields.io/coveralls/sguilly/loopback-nodejs-client.svg?style=flat-square

[depstat-url]: https://david-dm.org/sguilly/loopback-nodejs-client
[depstat-image]: https://david-dm.org/sguilly/loopback-nodejs-client.svg?style=flat-square

[download-badge]: http://img.shields.io/npm/dm/loopback-nodejs-client.svg?style=flat-square
