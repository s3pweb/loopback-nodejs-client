/**
 * Created by sguilly on 17/11/16.
 */
/**
 * Created by sguilly on 03/11/16.
 */
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var rest = require('restler');
var LoopbackModel = require('./LoopbackModel.js');

var LoopbackClient = function () {
  function LoopbackClient(baseUrl, user, password) {
    _classCallCheck(this, LoopbackClient);

    this.user = user;
    this.password = password;
    this.token = null;
    this.baseUrl = baseUrl;
  }

  _createClass(LoopbackClient, [{
    key: 'getBaseUrl',
    value: function getBaseUrl() {
      return this.baseUrl;
    }
  }, {
    key: 'getToken',
    value: function getToken() {
      console.log('1=', this.token);

      return this.token;
    }
  }, {
    key: 'createToken',
    value: function createToken() {
      var _this = this;

      var promise = new Promise(function (resolve, reject) {

        if (_this.token) {
          console.log('token from cache');
          resolve(_this.token);
        } else {

          console.log('create token');

          var data = {
            email: _this.user,
            password: _this.password
          };

          rest.postJson(_this.baseUrl + '/users/login?include=user', data).on('complete', function (result) {

            //console.log('result=',result)
            if (result instanceof Error) {
              reject(result.message);
            } else {
              _this.token = result.id;
              resolve(_this.token);
            }
          });
        }
      });

      return promise;
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