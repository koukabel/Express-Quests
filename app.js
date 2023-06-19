require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;


const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const usersHandlers = require("./usersHandlers");
const validators = require("./validators");

const { hashPassword,  verifyPassword, verifyToken} = require("./auth.js");


app.post("/api/users", hashPassword, usersHandlers.postUser);
app.post("/api/movies", verifyToken, movieHandlers.postMovie);


app.put("/api/users/:id", hashPassword, usersHandlers.updateUser);
app.put("/api/movies/:id", verifyToken, validators.validateMovie, movieHandlers.updateMovie);

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users/", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUsersById);

app.put("/api/movies/:id",verifyToken, movieHandlers.updateMovie);
app.put("/api/users/:id", usersHandlers.updateUser)

app.delete("/api/movies/:id", verifyToken, movieHandlers.deleteMovie);
app.delete("/api/users/:id", usersHandlers.deleteUser);

app.post("/api/login", usersHandlers.getUserByEmailWithPasswordAndPassToNext, verifyPassword
);




app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});