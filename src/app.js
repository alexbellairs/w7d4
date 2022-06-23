require("./db/connection");
const mongoose = require("mongoose");
const yargs = require("yargs");
const {
  addMovie,
  listMovies,
  updateMovie,
  deleteMovie,
} = require("./movies/movieMethods");

const app = async (yargsObj) => {
  try {
    if (yargsObj.add) {
      await addMovie({
        title: yargsObj.title,
        actor: yargsObj.actor,
        director: yargsObj.director,
        rating: yargsObj.rating,
      });
      console.log(await listMovies());
    } else if (yargsObj.list) {
      console.log(await listMovies());
    } else if (yargsObj.update) {
      const criteria = { title: yargsObj.update };
      let update = {};
      if (yargsObj.title) {
        Object.assign(update, { title: yargsObj.title });
      }
      if (yargsObj.actor) {
        Object.assign(update, { actor: yargsObj.actor });
      }
      if (yargsObj.director) {
        Object.assign(update, { director: yargsObj.director });
      }
      if (yargsObj.rating) {
        Object.assign(update, { rating: yargsObj.rating });
      }
      await updateMovie(criteria, update);
      console.log(await listMovies());
    } else if (yargsObj.delete) {
      const criteria = { title: yargsObj.delete };
      await deleteMovie(criteria);
      console.log(await listMovies());
    } else {
      console.log("Incorrect Command");
    }
    await mongoose.disconnect();
  } catch (error) {
    console.log(error);
  }
};

app(yargs.argv);
