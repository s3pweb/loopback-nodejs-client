"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var axios = require('axios');

var debug = require('debug')('LoopBackClient');

var LoopbackModel = function () {
  function LoopbackModel(model, tokenClient) {
    _classCallCheck(this, LoopbackModel);

    this.baseUrl = tokenClient.getBaseUrl();
    this.headers = tokenClient.headers;
    this.headers.authorization = tokenClient.getToken();
    this.model = model;

    this.client = axios.create({
      headers: this.headers,
      timeout: 5000
    });
  }

  _createClass(LoopbackModel, [{
    key: 'get',
    value: function get(url, query) {
      var _this = this;

      return new Promise(function (resolve, reject) {

        debug('get', url, _this.headers, query);

        _this.client.get(url, { params: query }).then(function (response) {
          debug('response', response.data);
          resolve(response.data);
        }).catch(function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: 'post',
    value: function post(url, data, query) {
      var _this2 = this;

      debug('post', url, this.headers, data, query);
      debug('url', url);
      debug('data', data);
      debug('query', query);

      return new Promise(function (resolve, reject) {

        _this2.client.post(url, data, { params: query }).then(function (response) {
          debug('response', response.data);
          resolve(response.data);
        }).catch(function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: 'put',
    value: function put(url, data) {
      var _this3 = this;

      debug('put', url, this.headers, data);

      return new Promise(function (resolve, reject) {

        _this3.client.put(url, data).then(function (response) {
          debug('response', response.data);
          resolve(response.data);
        }).catch(function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: 'patch',
    value: function patch(url, data) {
      var _this4 = this;

      debug('patch', url, this.headers, data);

      return new Promise(function (resolve, reject) {

        _this4.client.patch(url, data).then(function (response) {
          debug('response', response.data);
          resolve(response.data);
        }).catch(function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: 'del',
    value: function del(url) {
      var _this5 = this;

      debug('delete', url, this.headers);

      return new Promise(function (resolve, reject) {

        _this5.client.delete(url).then(function (response) {
          debug('response', response.data);
          resolve(response.data);
        }).catch(function (error) {
          reject(error);
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

      var url = this.baseUrl + '/' + this.model + '/count';
      return this.get(url, query);
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
    key: 'updateAttributesById',
    value: function updateAttributesById(id, data) {
      var url = this.baseUrl + '/' + this.model + '/' + id;
      return this.patch(url, data);
    }
  }, {
    key: 'find',
    value: function find(query) {

      var url = this.baseUrl + '/' + this.model;
      return this.get(url, query);
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
  }, {
    key: 'upsertWithWhere',
    value: function upsertWithWhere(query, data) {

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