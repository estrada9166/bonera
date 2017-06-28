# Bonera Web Framewor

### Minimalist web framework for node.js

#### Installation
------
`$ npm install bonera`


#### Features
------

- Use middlewares
- Get
- Put
- Patch
- Post
- Delete

##### create a middleware

```javascript
app.use((req, res) => {
  //create the middleware to use
})
```

##### access the params of the url using 

```javascript
req.params
```

##### access the query of the url using 

```javascript
req.query
```

##### access the form of the post using 

```javascript
req.body
```

#### e.g
------

```javascript
const bonera = require('bonera');
const app = bonera();

//Create a middleware to display the respond as a JSON
app.use((req, res) => {
  res.json = (val) => res.end(JSON.stringify(val));
});

app.get('/', (req, res) => {
  console.log('Hello world');
});

//if the path is /user/?message=Hello-world
app.get('/greet', (req, res) => {
  console.log(`The message ${req.query.message}`);
});

app.get('/user/:id', (req, res) => {
  console.log(`The user id is ${req.params.id}`);
});

app.post('/user', (req, res) => {
  console.log('A post has been made, use req.body to access to the data')
});

app.put('/user/:id', (req, res) => {
  console.log('A put has been made, access to the params with req.params.id');
});

app.patch('/user/:id', (req, res) => {
  console.log('A patch has been made, access to the params with req.params.id');  
});

app.delete('/user/:id', (req, res) => {
  console.log('A delete has been made, access to the params with req.params.id');
});


```






