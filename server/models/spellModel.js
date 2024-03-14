const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const spellSchema = new Schema({
  name: String,
  level: Number,
  description: String,
});

module.exports = mongoose.model("Spell", spellSchema);
