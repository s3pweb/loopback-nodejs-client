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

  mergeHeaders(h1,h2)
  {
    var keys = Object.keys(h2)

    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];

      h1[key] = h2[key]
      
    }

    return h1
  }

  get(url, query, options) {


    var params = {
      method: "GET",
      headers: options && options.headers ? this.mergeHeaders(this.headers,options.headers):this.headers,
    }

    if(options && options.timeout)
    {
      params.timeout = options.timeout
    }

    debug("get", url, this.headers, query);

    return fetch(url + getQueryParams(query), params).then(handleErrors);
  }

  post(url, data, query, options) {
    debug("post");
    debug("url", url);
    debug("data", data);
    debug("query", query);

    var params ={
      method: "POST",
      headers: options && options.headers ? this.mergeHeaders(this.headers,options.headers):this.headers,
      body: JSON.stringify(data)
    }

    return fetch(url + getQueryParams(query), params ).then(handleErrors);
  }

  put(url, data, options) {
    debug("put", url, this.headers, data);

    var params = {
      method: "PUT",
      headers: options && options.headers ? this.mergeHeaders(this.headers,options.headers):this.headers,
      body: JSON.stringify(data)
    }

    return fetch(url,params).then(handleErrors);
  }

  patch(url, data, options) {
    debug("patch", url, this.headers, data);

    var params ={
      method: "PATCH",
      headers: options && options.headers ? this.mergeHeaders(this.headers,options.headers):this.headers,
      body: JSON.stringify(data)
    }

    return fetch(url,params ).then(handleErrors);
  }

  del(url, options) {
    debug("delete", url, this.headers);

    var params ={
      method: "DELETE",
      headers: this.headers
    }

    return fetch(url, params ).then(handleErrors);
  }

  findById(data, options) {
    const url = `${this.baseUrl}/${this.model}/${data.id}`;
    return this.get(url, { filter: data.filter }, options);
  }

  create(data, options) {
    const url = `${this.baseUrl}/${this.model}`;
    return this.post(url, data, null, options);
  }

  count(query, options) {
    const url = `${this.baseUrl}/${this.model}/count`;
    return this.get(url, query, options);
  }

  updateAll(query, data, options) {
    const url = `${this.baseUrl}/${this.model}/update`;
    return this.post(url, data, query, options);
  }

  updateById(id, data, options) {
    const url = `${this.baseUrl}/${this.model}/${id}`;
    return this.put(url, data, options);
  }

  updateAttributesById(id, data, options) {
    const url = `${this.baseUrl}/${this.model}/${id}`;
    return this.patch(url, data, options);
  }

  find(query, options) {
    const url = `${this.baseUrl}/${this.model}`;
    return this.get(url, query, options);
  }

  findOne(query, options) {
    const url = `${this.baseUrl}/${this.model}/findOne`;
    return this.get(url, query, options);
  }

  deleteById(id, options) {
    const url = `${this.baseUrl}/${this.model}/${id}`;
    return this.del(url, options);
  }

  upsertWithWhere(query, data, options) {
    const url = `${this.baseUrl}/${this.model}/upsertWithWhere`;
    return this.post(url, data, query, options);
  }

  replaceOrCreate(data, options) {
    const url = `${this.baseUrl}/${this.model}/replaceOrCreate`;
    return this.post(url, data, null, options);
  }

  remote(name, query, data, options) {
    if (query && !data) {
      data = query;
      query = null;
    }

    const url = `${this.baseUrl}/${this.model}/${name}`;
    return this.post(url, data, query, options);
  }

  remoteGet(name, query, options) {
    const url = `${this.baseUrl}/${this.model}/${name}`;
    return this.get(url, query, options);
  }

  remotePut(name, data, options) {
    const url = `${this.baseUrl}/${this.model}/${name}`;
    return this.put(url, data, options);
  }

  remotePatch(name, data, options) {
    const url = `${this.baseUrl}/${this.model}/${name}`;
    return this.patch(url, data, options);
  }
}

module.exports = LoopbackModel;
