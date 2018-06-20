"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var rest = require('restler');
var axios = require('axios');

var LoopbackModel = require(__dirname + '/LoopbackModel.js');

var debug = require('debug')('LoopBackClient');

var LoopbackClient = function () {
  function LoopbackClient(baseUrl, user, password) {
    _classCallCheck(this, LoopbackClient);

    this.user = user;
    this.password = password;
    this.token = null;
    this.baseUrl = baseUrl;
    this.headers = {};
  }

  _createClass(LoopbackClient, [{
    key: 'setHeaders',
    value: function setHeaders(headers) {
      this.headers = headers;
    }
  }, {
    key: 'getBaseUrl',
    value: function getBaseUrl() {
      return this.baseUrl;
    }
  }, {
    key: 'getToken',
    value: function getToken() {
      return this.token;
    }
  }, {
    key: 'setCustomLoginPath',
    value: function setCustomLoginPath(path) {

      this.customLoginPath = path;
    }
  }, {
    key: 'createToken',
    value: function createToken() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (_this.token) {
          resolve(_this.token);
        } else {
          var data = {
            email: _this.user,
            password: _this.password
          };

          var options = {
            headers: _this.headers
          };

          var url = _this.baseUrl + (_this.customLoginPath ? _this.customLoginPath : '/users/login?include=user');

          debug('post', url, data);

          rest.postJson(url, data, options).on('complete', function (result, response) {

            debug(result);

            if (result instanceof Error) {
              reject(result.message);
            } else {

              if (response.statusCode !== 200) {
                reject(result);
              } else {
                _this.token = result.id;
                resolve(_this.token);
              }
            }
          });
        }
      });
    }
  }, {
    key: 'getModel',
    value: function getModel(name) {
      return new LoopbackModel(name, this);
    }
  }]);

  return LoopbackClient;
}();

module.exports = LoopbackClient;