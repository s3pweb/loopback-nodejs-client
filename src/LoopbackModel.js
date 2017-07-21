"use strict";

const rest = require('restler');

class LoopbackModel {
  constructor(model, tokenClient) {
    this.baseUrl = tokenClient.getBaseUrl();
    this.authorization = {authorization: tokenClient.getToken()};
    this.model = model
  }

  get(url, query) {
    return new Promise((resolve, reject) => {
      rest.get(url, {
          headers: this.authorization,
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
    return new Promise((resolve, reject) => {
      const options = {
        headers: this.authorization
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
    return new Promise((resolve, reject) => {
      rest.putJson(url, data, {
          headers: this.authorization
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
    return new Promise((resolve, reject) => {
      rest.del(url, {
          headers: this.authorization
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
}


module.exports = LoopbackModel;
