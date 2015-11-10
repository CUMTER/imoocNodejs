var mongoose = require("mongoose");
var MovieSchema = require("../schemas/movie");

var Movie = mongoose.modal("Movie",MovieSchema);

module.exports = Movie;

