"use strict";

const axios = require('axios')

const LoopbackModel = require(__dirname + '/LoopbackModel.js');

const debug = require('debug')('LoopBackClient')

class LoopbackClient {
  constructor(baseUrl, user, password) {
    this.user = user;
    this.password = password;
    this.token = null;
    this.baseUrl = baseUrl;
    this.headers = {};
  }

  setHeaders(headers) {
    this.headers = headers;
  }

  getBaseUrl() {
    return this.baseUrl;
  }

  getToken() {
    return this.token;
  }

  setCustomLoginPath(path) {

    this.customLoginPath = path

  }

  createToken() {
    return new Promise((resolve, reject) => {
      if (this.token) {
        resolve(this.token);
      }
      else {
        const data = {
          email: this.user,
          password: this.password
        };

        const options = {
          headers: this.headers
        };

        var url = this.baseUrl + (this.customLoginPath ? this.customLoginPath : '/users/login?include=user')

        debug('post',url,data)

        axios.post(url,data).then((response)=>{
          debug('response',response.data)

          if(response && response.data && response.data.id)
          {
            this.token = response.data.id;
            resolve(this.token);
          }
          else{
            reject('bad response',response)
          }
          
        })
        .catch((error)=>{
          reject(error)
        })
       
      }
    });
  }

  getModel(name) {
    return new LoopbackModel(name, this);
  }
}

module.exports = LoopbackClient;
