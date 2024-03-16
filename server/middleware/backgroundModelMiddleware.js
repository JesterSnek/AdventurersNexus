const mongoose = require("mongoose");
const backgroundSchema = require("../models/backgroundModel");

// Middleware

const Background = mongoose.model("Background", backgroundSchema);
module.exports = Background;
