const mongoose = require("mongoose");
const { number } = require("yargs");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  actor: {
    type: String,
  },
  director: {
    type: String,
  },
  rating: {
    type: Number,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
