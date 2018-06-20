"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var rest = require('restler');

var debug = require('debug')('LoopBackClient');

var LoopbackModel = function () {
  function LoopbackModel(model, tokenClient) {
    _classCallCheck(this, LoopbackModel);

    this.baseUrl = tokenClient.getBaseUrl();
    this.headers = tokenClient.headers;
    this.headers.authorization = tokenClient.getToken();
    this.model = model;
  }

  _createClass(LoopbackModel, [{
    key: 'get',
    value: function get(url, query) {
      var _this = this;

      return new Promise(function (resolve, reject) {

        debug('get', url, _this.headers, query);

        rest.get(url, {
          headers: _this.headers,
          query: query
        }).on('complete', function (result, response) {
          if (result instanceof Error) {
            reject(result.message);
          } else {
            if (response.statusCode !== 200) {
              reject(result);
            } else {
              resolve(result);
            }
          }
        });
      });
    }
  }, {
    key: 'post',
    value: function post(url, data, query) {
      var _this2 = this;

      debug('post', url, this.headers, data, query);

      return new Promise(function (resolve, reject) {
        var options = {
          headers: _this2.headers
        };
        if (query) {
          options.query = query;
        }
        rest.postJson(url, data, options).on('complete', function (result, response) {
          if (result instanceof Error) {
            reject(result.message);
          } else {
            if (response.statusCode !== 200) {
              reject(result);
            } else {
              resolve(result);
            }
          }
        });
      });
    }
  }, {
    key: 'put',
    value: function put(url, data) {
      var _this3 = this;

      debug('put', url, this.headers, data);

      return new Promise(function (resolve, reject) {
        rest.putJson(url, data, {
          headers: _this3.headers
        }).on('complete', function (result, response) {
          if (result instanceof Error) {
            reject(result.message);
          } else {
            if (response.statusCode !== 200) {
              reject(result);
            } else {
              resolve(result);
            }
          }
        });
      });
    }
  }, {
    key: 'patch',
    value: function patch(url, data) {
      var _this4 = this;

      debug('patch', url, this.headers, data);

      return new Promise(function (resolve, reject) {
        rest.patchJson(url, data, {
          headers: _this4.headers
        }).on('complete', function (result, response) {
          if (result instanceof Error) {
            reject(result.message);
          } else {
            if (response.statusCode !== 200) {
              reject(result);
            } else {
              resolve(result);
            }
          }
        });
      });
    }
  }, {
    key: 'del',
    value: function del(url) {
      var _this5 = this;

      debug('delete', url, this.headers);

      return new Promise(function (resolve, reject) {
        rest.del(url, {
          headers: _this5.headers
        }).on('complete', function (result, response) {
          if (result instanceof Error) {
            reject(result.message);
          } else {
            if (response.statusCode !== 200) {
              reject(result);
            } else {
              resolve(result);
            }
          }
        });
      });
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
    value: function count(query) {

      if (query.where) {
        query.where = JSON.stringify(query.where);
      }

      var url = this.baseUrl + '/' + this.model + '/count';
      return this.get(url, query);
    }
  }, {
    key: 'updateAll',
    value: function updateAll(query, data) {

      if (query.where) {
        query.where = JSON.stringify(query.where);
      }

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
    key: 'updateAttributesById',
    value: function updateAttributesById(id, data) {
      var url = this.baseUrl + '/' + this.model + '/' + id;
      return this.patch(url, data);
    }
  }, {
    key: 'find',
    value: function find(query) {
      if (query.filter) {
        query.filter = JSON.stringify(query.filter);
      }

      var url = this.baseUrl + '/' + this.model;
      return this.get(url, query);
    }
  }, {
    key: 'findOne',
    value: function findOne(query) {

      if (query.filter) {
        query.filter = JSON.stringify(query.filter);
      }

      var url = this.baseUrl + '/' + this.model + '/findOne';
      return this.get(url, query);
    }
  }, {
    key: 'deleteById',
    value: function deleteById(id) {
      var url = this.baseUrl + '/' + this.model + '/' + id;
      return this.del(url);
    }
  }, {
    key: 'upsertWithWhere',
    value: function upsertWithWhere(query, data) {

      if (query.where) {
        query.where = JSON.stringify(query.where);
      }

      var url = this.baseUrl + '/' + this.model + '/upsertWithWhere';
      return this.post(url, data, query);
    }
  }, {
    key: 'replaceOrCreate',
    value: function replaceOrCreate(data) {
      var url = this.baseUrl + '/' + this.model + '/replaceOrCreate';
      return this.post(url, data);
    }
  }, {
    key: 'remote',
    value: function remote(name, query, data) {

      if (query && !data) {
        data = query;
        query = null;
      }

      var url = this.baseUrl + '/' + this.model + '/' + name;
      return this.post(url, data, query);
    }
  }]);

  return LoopbackModel;
}();

module.exports = LoopbackModel;