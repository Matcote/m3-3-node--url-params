# 3.3.0 - Review concepts

---

## EJS

- What's the difference between these two?

```js
<%- myVar %>
<%= myVar %>
```

_...Why do we have two options?_

---

What is this for?

```ejs
<%- include('pages/homepage', {title: 'The Best Website'}) %>
```

_...What makes this so powerful?_

---

What notation do we use to run JS snippets inside of an `.ejs` file?

`const array = ['one', 'two', 'three']`

```js
// Example
<ul>array.forEach(element => {<li>element</li>});</ul>
```

---

## Express

- What express _routing method_ have we used?
- What are its parameters?
- What is the minimum amount of code to set up an express server?

```js
// Example
const callbackFunc = (req, res) =>{
  res.status(200)
  res.send()
  res.json()
}

.get('/users/', callbackFunc);
```

- What is the minimum amount of code to set up an express server?

```js
// Example
const express = require('express');

const app - express();

app.get('/', (req, res) =>{
  res.statues(200).json({status: 200, data: (message:'ok')}}
})
```

---

`https://mysite.com/contact-info?name=Fred&age=32`

```js
// ...
app.get("/contact-info", (req, res) => {
  const name = req.query.name;
  const age = req.query.age;
  //OR (better option)
  //const { name, age } = req.query;

  res.json({ status: 200 });
});
```
