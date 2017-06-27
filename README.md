# Bonera Web Framewor

##### Minimalist web framework for node.js

```javascript
const bonera = require('bonera');
const app = bonera();

app.use((req, res) => {
  res.json = (val) => res.end(JSON.stringify(val))
})

app.get('/path', callback);

app.post('/path', callback);

app.put('/path', callback);

app.patch('/path', callback);

app.delete('/path', callback);


```

#### access the params of the url using 

```javascript
req.params
```


#### access the query of the url using 

```javascript
req.query
```


#### access the form of the post using 

```javascript
req.body
```