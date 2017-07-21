"use strict";

const rest = require('restler');
const LoopbackModel = require(__dirname + '/LoopbackModel.js');

class LoopbackClient {
  constructor(baseUrl, user, password) {
    this.user = user;
    this.password = password;
    this.token = null;
    this.baseUrl = baseUrl;
  }

  getBaseUrl() {
    return this.baseUrl;
  }

  getToken() {
    return this.token;
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

        rest.postJson(this.baseUrl + '/users/login?include=user',
          data).on('complete', (result) => {
          if (result instanceof Error) {
            reject(result.message);
          } else {
            this.token = result.id;
            resolve(this.token);
          }
        });
      }
    });
  }

  getModel(name) {
    return new LoopbackModel(name, this);
  }
}

module.exports = LoopbackClient;
