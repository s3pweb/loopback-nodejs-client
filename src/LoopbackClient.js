"use strict";

const fetch = typeof window === 'undefined' ? require('node-fetch') : window.fetch;

const debug = require("debug")("LoopBackClient");

const LoopbackModel = require(__dirname + "/LoopbackModel.js");


const handleErrors = response => {
  debug(response);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
};

class LoopbackClient {
  constructor(baseUrl, user, password) {
    this.user = user;
    this.password = password;
    this.token = null;
    this.baseUrl = baseUrl;
    this.headers = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };
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
    this.customLoginPath = path;
  }

  createToken() {
    return new Promise((resolve, reject) => {
      if (this.token) {   
        debug('current token',this.token)    
        resolve(this.token);
      } else {
        const data = {
          email: this.user,
          password: this.password
        };

        const options = {
          headers: this.headers
        };

        var url =
          this.baseUrl +
          (this.customLoginPath
            ? this.customLoginPath
            : "/users/login?include=user");

        debug("post", url, data, this.headers);

        fetch(url, {
          method: "POST",
          body: JSON.stringify(data),
          headers: this.headers
        })
          .then(handleErrors)
          .then(result => {
            this.token = result.id;

            debug('r=',result)
            resolve(result.id);
          })
          .catch(error => {            
            reject(error);
          });
      }
    });
  }

  getModel(name) {
    return new LoopbackModel(name, this);
  }
}

module.exports = LoopbackClient;
