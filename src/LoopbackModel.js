"use strict";

const axios = require('axios')

const debug = require('debug')('LoopBackClient')

class LoopbackModel {
  constructor(model, tokenClient) {
    this.baseUrl = tokenClient.getBaseUrl();
    this.headers = tokenClient.headers;
    this.headers.authorization = tokenClient.getToken();
    this.model = model

    this.client = axios.create(
      {
       headers: this.headers,
       timeout: 5000,
     });
  }

  get(url, query) {
    return new Promise((resolve, reject) => {

      debug('get',url,this.headers,query)      

      this.client.get(url,{ params: query }).then((response)=>{
        debug('response',response.data)
        resolve(response.data)
      })
      .catch((error)=>{
        reject(error)
      })

    });
  }

  post(url, data, query) {

    debug('post',url,this.headers,data,query)    
    debug('url',url) 
    debug('data',data) 
    debug('query',query) 
    

    return new Promise((resolve, reject) => {

      this.client.post(url,data,{params: query}).then((response)=>{
        debug('response',response.data)
        resolve(response.data)
      })
      .catch((error)=>{
        reject(error)
      })
    });
  }

  put(url, data) {

    debug('put',url,this.headers,data)

    return new Promise((resolve, reject) => {

      this.client.put(url,data).then((response)=>{
        debug('response',response.data)
        resolve(response.data)
      })
      .catch((error)=>{
        reject(error)
      })

    });
  }

  patch(url, data) {

    debug('patch',url,this.headers,data)

    return new Promise((resolve, reject) => {

      this.client.patch(url,data).then((response)=>{
        debug('response',response.data)
        resolve(response.data)
      })
      .catch((error)=>{
        reject(error)
      })

    });
  }

  del(url) {

    debug('delete',url,this.headers)

    return new Promise((resolve, reject) => {

      this.client.delete(url).then((response)=>{
        debug('response',response.data)
        resolve(response.data)
      })
      .catch((error)=>{
        reject(error)
      })
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

  upsertWithWhere(query,data) {     

    const url = `${this.baseUrl}/${this.model}/upsertWithWhere`;
    return this.post(url,data,query);
  }

  replaceOrCreate(data) {
    const url = `${this.baseUrl}/${this.model}/replaceOrCreate`;
    return this.post(url,data);
  }

  remote(name,query,data) {

    if(query && !data)   
    {
      data = query
      query = null
    }

    const url = `${this.baseUrl}/${this.model}/${name}`;
    return this.post(url,data,query);
  }
}

module.exports = LoopbackModel;
