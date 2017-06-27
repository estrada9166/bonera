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
        path: path.split('/')[1],
        callback: callback,
        longPath: path
      })
    },
    post(path, callback) {
      routes.push({
        method: 'POST', 
        path: path.split('/')[1],
        callback: callback,
        longPath: path
      })
    },
    put(path, callback) {
      routes.push({
        method: 'PUT', 
        path: path.split('/')[1],
        callback: callback,
        longPath: path
      })
    },
    patch(path, callback) {
      routes.push({
        method: 'PATCH', 
        path: path.split('/')[1],
        callback: callback,
        longPath: path
      })
    },
    delete(path, callback) {
      routes.push({
        method: 'DELETE', 
        path: path.split('/')[1],
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
        //res.json = (val) => res.end(JSON.stringify(val))   
        for(let i = 0; i < middleware.length; i++) {
          middleware[i].callback(req, res)
        }               
        for(let i = 0; i < routes.length; i++) {
          const validateMethod = routes[i]['method'] === req.method;
          const validatePath = routes[i]['path'] === req.url.split('/')[1];
          const validatePathLength = routes[i]['longPath'].split('/').length == req.url.split('/').length;
          if(validateMethod && validatePath && validatePathLength) {
            methods[req.method](req, res, routes[i]['callback'], routes[i]['longPath'])
          }
        }
      }).listen(port)
      callback()
    }
  }
}

module.exports =  bonera;