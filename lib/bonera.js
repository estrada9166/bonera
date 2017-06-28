'use strict';

const http = require('http');
const url = require('url');
const qs = require('querystring');

const methods = {};
const routes = [];
const middleware = [];

const findParams = (route, urlPath) => {
  if(route && urlPath) {
    const paramData = {};
    const paramDataUrl = url.parse(urlPath, true).path.split('/');     
    const routeParams = route.split('/');
    for(let i = 0; i < routeParams.length; i++) {
      if(routeParams[i].indexOf(':') >= 0){
        const data = routeParams[i].slice(1, routeParams[i].length)
        paramData[data] = paramDataUrl[i];
      }
    }
    return paramData;
  }
}

const regexPath = url => {
  const urlSplited = url.split('/');
  const regexUrl = []
  for(var i = 0; i < urlSplited.length; i++) {
    if(urlSplited[i].indexOf(':') >= 0) {
      regexUrl.push('(.*)');
    } else {
      regexUrl.push(urlSplited[i]);
    }
  }
  return regexUrl.join('/')
}

methods.GET = (req, res, callback, path) => {
  const urlParams = findParams(path, req.url);          
  const queryData = url.parse(req.url, true).query;
  req.query = queryData;
  req.params = urlParams;
  return callback(req, res)
}; 

methods.POST = (req, res, callback) => {
  let body = '';
  req.on('data', (data)=> {
    body += data;
    if(body.length > 1e6){
      req.connection.destroy();
    }
  });
  req.on('end', ()=> {
    req.body = qs.parse(body);
    callback(req, res)
  })
};

methods.PUT = (req, res, callback, path) => {
  const urlParams = findParams(path, req.url);
  req.params = urlParams;
  let body = '';
  req.on('data', (data)=> {
    body += data;
    if(body.length > 1e6){
      req.connection.destroy();
    }
  });
  req.on('end', ()=> {
    req.body = qs.parse(body);
    return callback(req, res)
  })
};

methods.PATCH = (req, res, callback, path) => {
  const urlParams = findParams(path, req.url);
  req.params = urlParams;
  let body = '';
  req.on('data', (data)=> {
    body += data;
    if(body.length > 1e6){
      req.connection.destroy();
    }
  });
  req.on('end', ()=> {
    req.body = qs.parse(body);
    return callback(req, res)
  })
};

methods.DELETE = (req, res, callback, path) => {
  const urlParams = findParams(path, req.url);
  req.params = urlParams;
  return callback(req, res)
}

const bonera = () => {
  return {
    get(path, callback) {
      routes.push({
        method: 'GET', 
        path: regexPath(path),
        callback: callback,
        longPath: path
      })
    },
    post(path, callback) {
      routes.push({
        method: 'POST', 
        path: regexPath(path),
        callback: callback,
        longPath: path
      })
    },
    put(path, callback) {
      routes.push({
        method: 'PUT', 
        path: regexPath(path),
        callback: callback,
        longPath: path
      })
    },
    patch(path, callback) {
      routes.push({
        method: 'PATCH', 
        path: regexPath(path),
        callback: callback,
        longPath: path
      })
    },
    delete(path, callback) {
      routes.push({
        method: 'DELETE', 
        path: regexPath(path),
        callback: callback,
        longPath: path
      })
    },
    use(callback) {
      middleware.push({
        callback: callback
      })
    },
    listen(port, callback) {
      http.createServer((req, res)=> {
        for(let i = 0; i < middleware.length; i++) {
          middleware[i].callback(req, res)
        }               
        for(let i = 0; i < routes.length; i++) {
          const validateMethod = routes[i]['method'] === req.method;
          //const validatePath = routes[i]['path'] === req.url.split('/')[1];
          //const validatePathLength = routes[i]['longPath'].split('/').length == req.url.split('/').length;
          const validatePath = new RegExp(routes[i]['path'])
          const pathTest = validatePath.test(req.url)
          if(validateMethod && pathTest) {
            methods[req.method](req, res, routes[i]['callback'], routes[i]['longPath'])
          }
        }
      }).listen(port)
      callback()
    }
  }
}

module.exports =  bonera;