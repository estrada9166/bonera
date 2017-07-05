const bonera = require('../lib/bonera')
const app = bonera();
const {getTest, postTest, putTest, patchTest, deleteTest} = require('./methods');


app.get('/', (req, res) => {
  res.end("root path")
})

app.get('/users', (req, res) => {
  res.end("users path")
})

app.get('/cities', (req, res) => {
  res.end("cities path")
})

app.post('/', (req, res) => {
  res.end(req.body.key)
})

app.post('/users', (req, res) => {
  res.end(req.body.key)
})

app.post('/cities', (req, res) => {
  res.end(req.body.key)
})

app.put('/users/:userName', (req, res) => {
  res.end(JSON.stringify({userName: req.params.userName, name: req.body.key}))
})

app.put('/cities/:id', (req, res) => {
  const id = parseInt(req.params.id)
  res.end(JSON.stringify({id: id, city: req.body.key}))
})

app.put('/restaurant/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const phone = parseInt(req.body.key)
  res.end(JSON.stringify({id: id, phone: phone}))
})

app.patch('/users/:userName', (req, res) => {
  res.end(JSON.stringify({userName: req.params.userName, name: req.body.key}))
})

app.patch('/cities/:id', (req, res) => {
  const id = parseInt(req.params.id)
  res.end(JSON.stringify({id: id, city: req.body.key}))
})

app.patch('/restaurant/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const phone = parseInt(req.body.key)
  res.end(JSON.stringify({id: id, phone: phone}))
})

app.delete('/users/:userName', (req, res) => {
  res.end(req.params.userName)
})

app.delete('/cities/:id', (req, res) => {
  res.end(req.params.id)
})

app.delete('/restaurant/:id', (req, res) => {
  res.end(req.params.id)
})

app.use((req, res) => {
  console.log('Hello')
})

app.listen(3000);

getTest('get route to root path', '/', 'root path');
getTest('get route to users path', '/users', 'users path');
getTest('get route to cities path', '/cities', 'cities path');

postTest('post hello to root path', '/', 'hello', 'hello');
postTest('post yourName to users path', '/users', 'yourName', 'yourName');
postTest('post yourCity to root path', '/cities', 'yourCity', 'yourCity');

putTest('put yourName to the user with userName yourUserName', '/users/yourUserName', 'yourName', JSON.stringify({userName: 'yourUserName', name: 'yourName'}));
putTest('put yourCity to the city with id 10', '/cities/10', 'yourCity', JSON.stringify({id: 10, city: 'yourCity'}));
putTest('put restaurant phone to the restaurant with id 1', '/restaurant/1', 1234567, JSON.stringify({id: 1, phone: 1234567}));

patchTest('put yourName to the user with userName yourUserName', '/users/yourUserName', 'yourName', JSON.stringify({userName: 'yourUserName', name: 'yourName'}));
patchTest('put yourCity to the city with id 10', '/cities/10', 'yourCity', JSON.stringify({id: 10, city: 'yourCity'}));
patchTest('put restaurant phone to the restaurant with id 1', '/restaurant/1', 1234567, JSON.stringify({id: 1, phone: 1234567}));

deleteTest('delete the user with username yourUsername', '/users/yourUserName', 'yourUserName');
deleteTest('delete the city with id 9', '/cities/9', '9');
deleteTest('delete the restaurant with id 2', '/restaurant/2', '2');


