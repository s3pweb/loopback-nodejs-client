"use strict";

const rest = require('restler');

const debug = require('debug')('LoopBackClient')

class LoopbackModel {
  constructor(model, tokenClient) {
    this.baseUrl = tokenClient.getBaseUrl();
    this.headers = tokenClient.headers;
    this.headers.authorization = tokenClient.getToken();
    this.model = model
  }

  get(url, query) {
    return new Promise((resolve, reject) => {

      debug('get',url,this.headers,query)

      rest.get(url, {
          headers: this.headers,
          query: query
        }
      ).on('complete', function (result, response) {
        if (result instanceof Error) {
          reject(result.message);

        } else {
          if (response.statusCode !== 200) {
            reject(result)
          }
          else {
            resolve(result);
          }

        }
      });
    });
  }

  post(url, data, query) {

    debug('post',url,this.headers,data,query)

    return new Promise((resolve, reject) => {
      const options = {
        headers: this.headers
      };
      if (query) {
        options.query = query
      }
      rest.postJson(url, data, options
      ).on('complete', function (result, response) {
        if (result instanceof Error) {
          reject(result.message);
        } else {
          if (response.statusCode !== 200) {
            reject(result)
          }
          else {
            resolve(result);
          }
        }
      });
    });
  }

  put(url, data) {

    debug('put',url,this.headers,data)

    return new Promise((resolve, reject) => {
      rest.putJson(url, data, {
          headers: this.headers
        }
      ).on('complete', function (result, response) {
        if (result instanceof Error) {
          reject(result.message);
        } else {
          if(response.statusCode !== 200) {
            reject(result)
          }
          else {
            resolve(result);
          }
        }
      });

    });
  }

  patch(url, data) {

    debug('patch',url,this.headers,data)

    return new Promise((resolve, reject) => {
      rest.patchJson(url, data, {
          headers: this.headers
        }
      ).on('complete', function (result, response) {
        if (result instanceof Error) {
          reject(result.message);
        } else {
          if(response.statusCode !== 200) {
            reject(result)
          }
          else {
            resolve(result);
          }
        }
      });

    });
  }

  del(url) {

    debug('delete',url,this.headers)

    return new Promise((resolve, reject) => {
      rest.del(url, {
          headers: this.headers
        }
      ).on('complete', function (result, response) {
        if (result instanceof Error) {
          reject(result.message);
        } else {
          if (response.statusCode !== 200) {
            reject(result)
          }
          else {
            resolve(result);
          }
        }
      });
    });
  }

  findById(data) {
    const url = `${this.baseUrl}/${this.model}/${data.id}`;
    return this.get(url, {filter: data.filter});
  }

  create(data) {
    const url = `${this.baseUrl}/${this.model}`;
    return this.post(url, data);
  }

  count(where) {
    const url = `${this.baseUrl}/${this.model}/count`;
    return this.get(url, where);
  }

  updateAll(query, data) {
    const url = `${this.baseUrl}/${this.model}/update`;
    return this.post(url, data, query);
  }

  updateById(id, data) {
    const url = `${this.baseUrl}/${this.model}/${id}`;
    return this.put(url, data);
  }

  updateAttributesById(id, data) {
    const url = `${this.baseUrl}/${this.model}/${id}`;
    return this.patch(url, data);
  }

  find(filter) {
    const url = `${this.baseUrl}/${this.model}`;
    return this.get(url, filter);
  }

  findOne(query) {
    const url = `${this.baseUrl}/${this.model}/findOne`;
    return this.get(url, query);
  }

  deleteById(id) {
    const url = `${this.baseUrl}/${this.model}/${id}`;
    return this.del(url);
  }

  upsertWithWhere(query,data) {
    const url = `${this.baseUrl}/${this.model}/upsertWithWhere`;
    return this.post(url,data,query);
  }

  replaceOrCreate(data) {
    const url = `${this.baseUrl}/${this.model}/replaceOrCreate`;
    return this.post(url,data);
  }

  remote(name,data) {
    const url = `${this.baseUrl}/${this.model}/${name}`;
    return this.post(url,data);
  }
}


module.exports = LoopbackModel;
