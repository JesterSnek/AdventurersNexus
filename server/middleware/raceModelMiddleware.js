const mongoose = require("mongoose");
const raceSchema = require("../models/raceModel");

// Middleware

const Race = mongoose.model("Race", raceSchema);
module.exports = Race;
