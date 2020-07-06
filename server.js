"use strict";

const morgan = require("morgan");
const express = require("express");

const { top50 } = require("./data/top50");

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
  });
});
app.get("/top50/popular-artist", (req, res) => {
  res.status(200);
  res.render("pages/popular-artist", {
    title: "Most Popular Artist",
    path: req.originalUrl,
    top50: top50,
  });
});
app.get("/top50/song/:id", (req, res) => {
  res.status(200);
  res.render("pages/song-page", {
    title: `Song #${req.params.id}`,
    path: req.originalUrl,
    top50: top50,
    id: req.params.id - 1,
  });
});

// handle 404s
app.get("*", (req, res) => {
  res.status(404);
  res.render("pages/fourOhFour", {
    title: "I got nothing",
    path: req.originalUrl,
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
