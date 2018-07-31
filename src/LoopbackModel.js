"use strict";

const debug = require("debug")("LoopBackClient");

const fetch =
  typeof window === "undefined" ? require("node-fetch") : window.fetch;
const qs = require("qs");

const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
};

const getQueryParams = query =>
  query && qs.stringify(query) ? "?" + qs.stringify(query) : "";

class LoopbackModel {
  constructor(model, tokenClient) {
    this.baseUrl = tokenClient.getBaseUrl();
    this.headers = tokenClient.headers;
    this.headers.authorization = tokenClient.getToken();
    this.model = model;
   
  }

  get(url, query) {
    debug("get", url, this.headers, query);
    return fetch(url + getQueryParams(query), {
      method: "GET",
      headers: this.headers
    }).then(handleErrors);
  }

  post(url, data, query) {
    debug("post", url, this.headers, data, query);
    debug("url", url);
    debug("data", data);
    debug("query", query);

    return fetch(url + getQueryParams(query), {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data)
    }).then(handleErrors);
  }

  put(url, data) {
    debug("put", url, this.headers, data);

    return fetch(url, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(data)
    }).then(handleErrors);
  }

  patch(url, data) {
    debug("patch", url, this.headers, data);

    return fetch(url, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data)
    }).then(handleErrors);
  }

  del(url) {
    debug("delete", url, this.headers);

    return fetch(url, {
      method: 'DELETE',
      headers: this.headers,
    }).then(handleErrors);

  }

  findById(data,options) {
    const url = `${this.baseUrl}/${this.model}/${data.id}`;
    return this.get(url, { filter: data.filter });
  }

  create(data) {
    const url = `${this.baseUrl}/${this.model}`;
    return this.post(url, data);
  }

  count(query) {
    const url = `${this.baseUrl}/${this.model}/count`;
    return this.get(url, query);
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

  find(query) {
    const url = `${this.baseUrl}/${this.model}`;
    return this.get(url, query);
  }

  findOne(query) {
    const url = `${this.baseUrl}/${this.model}/findOne`;
    return this.get(url, query);
  }

  deleteById(id) {
    const url = `${this.baseUrl}/${this.model}/${id}`;
    return this.del(url);
  }

  upsertWithWhere(query, data) {
    const url = `${this.baseUrl}/${this.model}/upsertWithWhere`;
    return this.post(url, data, query);
  }

  replaceOrCreate(data) {
    const url = `${this.baseUrl}/${this.model}/replaceOrCreate`;
    return this.post(url, data);
  }

  remote(name, query, data) {
    if (query && !data) {
      data = query;
      query = null;
    }

    const url = `${this.baseUrl}/${this.model}/${name}`;
    return this.post(url, data, query);
  }

  remoteGet(name, query) {
    const url = `${this.baseUrl}/${this.model}/${name}`;
    return this.get(url, query);
  }

  remotePut(name, data) {
    const url = `${this.baseUrl}/${this.model}/${name}`;
    return this.put(url, data);
  }

  remotePatch(name, data) {
    const url = `${this.baseUrl}/${this.model}/${name}`;
    return this.patch(url, data);
  }
}

module.exports = LoopbackModel;
