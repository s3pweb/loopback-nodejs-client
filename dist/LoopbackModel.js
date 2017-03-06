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

var LoopbackModel = function () {
  function LoopbackModel(model, tokenClient) {
    _classCallCheck(this, LoopbackModel);

    this.baseUrl = tokenClient.getBaseUrl();

    this.authorization = { authorization: tokenClient.getToken() };

    this.model = model;
  }

  _createClass(LoopbackModel, [{
    key: 'get',
    value: function get(url, query) {
      var _this = this;

      var promise = new Promise(function (resolve, reject) {

        rest.get(url, {
          headers: _this.authorization,
          query: query
        }).on('complete', function (result, response) {
          if (result instanceof Error) {
            reject(result.message);
          } else {
            if (response.statusCode != 200) {
              reject(result);
            } else {
              resolve(result);
            }
          }
        });
      });
      return promise;
    }
  }, {
    key: 'post',
    value: function post(url, data, query) {
      var _this2 = this;

      var promise = new Promise(function (resolve, reject) {

        var options = {
          headers: _this2.authorization
        };

        if (query) {
          options.query = query;
        }

        rest.postJson(url, data, options).on('complete', function (result, response) {

          if (result instanceof Error) {
            reject(result.message);
          } else {
            if (response.statusCode != 200) {
              reject(result);
            } else {
              resolve(result);
            }
          }
        });
      });

      return promise;
    }
  }, {
    key: 'put',
    value: function put(url, data) {
      var _this3 = this;

      var promise = new Promise(function (resolve, reject) {

        rest.putJson(url, data, {
          headers: _this3.authorization
        }).on('complete', function (result, response) {
          if (result instanceof Error) {
            reject(result.message);
          } else {
            if (response.statusCode != 200) {
              reject(result);
            } else {
              resolve(result);
            }
          }
        });
      });

      return promise;
    }
  }, {
    key: 'del',
    value: function del(url) {
      var _this4 = this;

      var promise = new Promise(function (resolve, reject) {

        rest.del(url, {
          headers: _this4.authorization
        }).on('complete', function (result, response) {
          if (result instanceof Error) {
            reject(result.message);
          } else {
            if (response.statusCode != 200) {
              reject(result);
            } else {
              resolve(result);
            }
          }
        });
      });

      return promise;
    }
  }, {
    key: 'findById',
    value: function findById(data) {

      var url = this.baseUrl + '/' + this.model + '/' + data.id;
      return this.get(url, { filter: data.filter });
    }
  }, {
    key: 'create',
    value: function create(data) {
      var url = this.baseUrl + '/' + this.model;
      return this.post(url, data);
    }
  }, {
    key: 'count',
    value: function count(where) {
      var url = this.baseUrl + '/' + this.model + '/count';
      return this.get(url, where);
    }
  }, {
    key: 'updateAll',
    value: function updateAll(query, data) {
      var url = this.baseUrl + '/' + this.model + '/update';
      return this.post(url, data, query);
    }
  }, {
    key: 'updateById',
    value: function updateById(id, data) {
      var url = this.baseUrl + '/' + this.model + '/' + id;
      return this.put(url, data);
    }
  }, {
    key: 'find',
    value: function find(filter) {
      var url = this.baseUrl + '/' + this.model;
      return this.get(url, filter);
    }
  }, {
    key: 'findOne',
    value: function findOne(query) {
      var url = this.baseUrl + '/' + this.model + '/findOne';
      return this.get(url, query);
    }
  }, {
    key: 'deleteById',
    value: function deleteById(id) {
      var url = this.baseUrl + '/' + this.model + '/' + id;
      return this.del(url);
    }
  }]);

  return LoopbackModel;
}();

module.exports = LoopbackModel;