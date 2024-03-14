const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const raceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  abilityScoreBonus: {
    Strenght: Number,
    Dexterity: Number,
    Constitution: Number,
    Intelligence: Number,
    Wisdom: Number,
    Charisma: Number,
  },
  size: {
    type: String,
    enum: {
      values: ["Small", "Medium", "Large"],
      message: "Race size is categorized to be either small, medium or large.",
    },
    required: true,
  },
  speed: {
    type: String,
    required: true,
  },
  language: {
    type: [String],
    required: true,
  },
  racialFeatures: {
    name: String,
    description: String,
  },
  Information: String,
});

module.exports = mongoose.model("Race", raceSchema);
