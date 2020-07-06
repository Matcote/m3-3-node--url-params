# 3.3.1 - URL Parameters

---

How do you feel about this? Is this DRY?

```js
app.get("/question1", q1);
app.get("/question2", q2);
app.get("/question3", q3);
app.get("/question4", q4);
app.get("/question5", q5);
app.get("/question6", q6);
app.get("/question7", q7);
app.get("/question8", q8);
app.get("/question9", q9);
app.get("/question10", q10);
```

---

## Example

```js
// given this endpoint
app.get("/user/:id", (req, res) => {
  res.send("ok");
});
```

- The server is listening for any requests at `/user/<ANYTHING>`
  - `https://mysite.com/user/bacon`
  - `https://mysite.com/user/morty`
  - `https://mysite.com/user/123`

---

```js
// given this endpoint
app.get("/user/:id", (req, res) => {
  console.log(req.params.id);
  res.send("ok");
});
```

- The `:id` creates a _variable_, or a dynamic value. Anything placed there in the url will become the value assigned to `id` for that call.
- The server can access this value in an object called `params` in the `req`uest.

```js
req: {
  //...
  params: {
    id: '<HERE>'
  },
  query: {}
  //...
}
```

---

```js
// given this endpoint
app.get("/user/:id", (req, res) => {
  res.send("ok");
});
```

- What is the value of `id` in each case?

```js
"https://mysite.com/user/bacon"; //
"https://mysite.com/user/morty"; //
"https://mysite.com/user/123"; //
```

---

We can access that value with `req.params`

```js
// given this endpoint
app.get("/user/:id", (req, res) => {
  console.log("THE PARAMS ARE ", req.params);
  res.send("ok");
});
```

So this entering this url in the browser `http://localhost:8000/user/123456`

```bash
THE PARAMS ARE { id: 123456 }
```

---

```js
// given this endpoint
app.get("/user/:id", (req, res) => {
  const { id } = req.params;

  res.send("ok");
});
```

---

```js
// NOT DRY :(
app.get("/question1", q1);
app.get("/question2", q2);
app.get("/question3", q3);
app.get("/question4", q4);
app.get("/question5", q5);
app.get("/question6", q6);
app.get("/question7", q7);
app.get("/question8", q8);
app.get("/question9", q9);
app.get("/question10", q10);

// DRY :)
const handleQuestion = (req, res) => {
  const { number } = req.params;
  res.render(`page/question${number}`);
};
app.get("/question/:number", handleQuestion);
```
