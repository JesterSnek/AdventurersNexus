const mongoose = require("mongoose");
const characterClassSchema = require("../models/characterClassModel");

// Middleware

const CharacterClass = mongoose.model(
  "CharacterClass",
  characterClassSchema,
  "characterClasses"
);
module.exports = CharacterClass;
