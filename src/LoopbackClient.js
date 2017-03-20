/**
 * Created by sguilly on 17/11/16.
 */
/**
 * Created by sguilly on 03/11/16.
 */
"use strict";

var rest = require('restler');
var LoopbackModel = require('./LoopbackModel.js');

class LoopbackClient {
  constructor(baseUrl,user,password) {

    this.user = user
    this.password = password
    this.token = null
    this.baseUrl = baseUrl
  }

  getBaseUrl()
  {
    return this.baseUrl
  }

  getToken()
  {

    return this.token
  }

  createToken()
  {
    var promise = new Promise((resolve, reject) => {

      if(this.token)
      {
        resolve(this.token);
      }
      else {


        var data = {
          email: this.user,
          password: this.password
        }

        rest.postJson(this.baseUrl+'/users/login?include=user', data

        ).on('complete', (result) =>{

          if (result instanceof Error) {
            reject(result.message);

          } else {
            this.token = result.id
            resolve(this.token);
          }
        });

      }

    })

    return promise
  }

  getModel(name)
  {
    return new LoopbackModel(name,this)
  }
}


module.exports = LoopbackClient
