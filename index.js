const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Celebrity = require("./models/celebrity");
const Movie = require("./models/movie");

const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.render("home");
});

app.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("celebrities/celebrities", { celebrities });
    })
    .catch((error) => {
      next(error);
    });
});

app.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

app.post("/celebrities/create", (req, res, next) => {
  const name = req.body.name;
  const occupation = req.body.occupation;
  const catchPhrase = req.body.catchPhrase;
  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase,
  })
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      res.redirect("/celebrities/create");
    });
});

app.get("/movies/create", (req, res, next) => {
  res.render("movies/new-movie");
});

app.post("/movies/create", (req, res, next) => {
  const name = req.body.name;
  const occupation = req.body.occupation;
  const catchPhrase = req.body.catchPhrase;
  Movie.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase,
  })
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      res.redirect("/movies/create");
    });
});

app.use((error, req, res, next) => {
  console.log(error);
  res.render("error");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((error) => {
    console.log("There was an error connecting to the database");
    console.log(error);
  });
