const http = require('http');
const request = require('request');

const getTest = (name, path, expected) => {
  test(name, () => {
    return new Promise (resolve => {
      http.get(`http://localhost:3000${path}`, res => {
        let data = '';
        res.on('data', _data => data += _data);
        res.on('end', () => resolve(data));
      })
    })
    .then((data) => {
      expect(data).toEqual(expected)
    })
  })
};

const postTest = (name, path, postWord, expected) => {
  test(name, () => {
    return new Promise (resolve => {
      request({
        url: `http://localhost:3000${path}`,
        method: 'POST',
        headers: {
          'User-Agent':   'Super Agent/0.0.1',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {'key': postWord}
      }, (err, res, body) => {
        resolve(body)
      })
    })
    .then(data => {
      expect(data).toEqual(expected)    
    })
  })
}

const putTest = (name, path, putWord, expected) => {
  test(name, () => {
    return new Promise(resolve => {
      request({
        url: `http://localhost:3000${path}`,
        method: 'PUT',
        headers: {
          'User-Agent':   'Super Agent/0.0.1',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {'key': putWord}
      }, (err, res, body) => {
        resolve(body)
      })
    })
    .then(data => {
      expect(data).toEqual(expected)
    })
  })
}

const patchTest = (name, path, putWord, expected) => {
  test(name, () => {
    return new Promise(resolve => {
      request({
        url: `http://localhost:3000${path}`,
        method: 'PATCH',
        headers: {
          'User-Agent':   'Super Agent/0.0.1',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {'key': putWord}
      }, (err, res, body) => {
        resolve(body)
      })
    })
    .then(data => {
      expect(data).toEqual(expected)
    })
  })
}

const deleteTest = (name, path, expected) => {
  test(name, () => {
    return new Promise(resolve => {
      request({
        url: `http://localhost:3000${path}`,
        method: 'DELETE'
      }, (err, res, body) => {
        resolve(body)
      })
    })
    .then(data => {
      expect(data).toEqual(expected)
    })
  })
}

module.exports = {getTest, postTest, putTest, patchTest, deleteTest}; 