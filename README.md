# loopback-nodejs-client [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
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

  updateAll(data) 

  updateById(data)

  find(filter)
   
  findById(data)

  findOne(query)

  deleteById(id)

## License

MIT © [Stéphane GUILLY]()


[npm-image]: https://badge.fury.io/js/loopback-nodejs-client.svg
[npm-url]: https://npmjs.org/package/loopback-nodejs-client
[travis-image]: https://travis-ci.org/sguilly/loopback-nodejs-client.svg?branch=master
[travis-url]: https://travis-ci.org/sguilly/loopback-nodejs-client
[daviddm-image]: https://david-dm.org/sguilly/loopback-nodejs-client.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/sguilly/loopback-nodejs-client
