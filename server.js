"use strict";

const morgan = require("morgan");
const express = require("express");

const { top50 } = require("./data/top50");
const { books } = require("./data/books");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// endpoints here
app.get("/top50", (req, res) => {
  res.status(200);
  res.render("pages/top50", {
    title: "Top 50 Songs Streamed on Spotify",
    path: req.originalUrl,
    top50: top50,
    id: -1,
  });
});
app.get("/top50/popular-artist", (req, res) => {
  res.status(200);
  res.render("pages/popular-artist", {
    title: "Most Popular Artist",
    path: req.originalUrl,
    top50: top50,
    id: -1,
  });
});
app.get("/top50/song/:id", (req, res) => {
  if (req.params.id > 0 && req.params.id < 51) {
    res.status(200);
    res.render("pages/song-page", {
      title: `Song #${req.params.id}`,
      path: req.originalUrl,
      top50: top50,
      id: req.params.id - 1,
    });
  } else {
    res.status(404);
    res.render("pages/fourOhFour", {
      title: "I got nothing",
      path: req.originalUrl,
      id: -1,
    });
  }
});

//books not songs
app.get("/books", (req, res) => {
  res.status(200);
  res.render("pages/books", {
    title: "Books",
    path: req.originalUrl,
    books: books,
    id: -1,
  });
});
app.get("/books/:id", (req, res) => {
  if (
    req.params.id === "fiction" ||
    req.params.id === "graphic-novel" ||
    req.params.id === "non-fiction" ||
    req.params.id === "drama"
  ) {
    res.status(200);
    res.render("pages/bookGenre", {
      title: req.params.id,
      path: req.originalUrl,
      books: books,
      id: -1,
    });
  } else if (req.params.id > 100 && req.params.id < 126) {
    res.status(200);
    res.render("pages/bookPage", {
      title: books[req.params.id - 101].title,
      path: req.originalUrl,
      books: books,
      id: req.params.id - 101,
    });
  } else {
    res.status(404);
    res.render("pages/fourOhFour", {
      title: "I got nothing",
      path: req.originalUrl,
      id: -1,
    });
  }
});

// handle 404s
app.get("*", (req, res) => {
  res.status(404);
  res.render("pages/fourOhFour", {
    title: "I got nothing",
    path: req.originalUrl,
    id: -1,
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
