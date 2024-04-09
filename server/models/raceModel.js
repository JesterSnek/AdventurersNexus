const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const raceSchema = new Schema({
  name: {
    type: String,
    required: [true, "A character must belong to a race."],
  },
  isCustomRace: {
    type: Boolean,
    default: false,
  },
  speed: Number,
  age: {
    description: String,
    maturity: Number,
    lifespan: Number,
  },
  size: {
    description: String,
    category: String,
    height_range: String,
    weight_range: String,
  },
  raceAbilityScoreIncreases: {
    Strength: Number,
    Dexterity: Number,
    Constitution: Number,
    Intelligence: Number,
    Wisdom: Number,
    Charisma: Number,
  },
  alignment: String,
  language_proficiencies: [String],
  traits: [
    {
      name: String,
      description: String,
    },
  ],
  subraces: [
    {
      name: String,
      description: String,
      raceAbilityScoreIncreases: {
        Strength: Number,
        Dexterity: Number,
        Constitution: Number,
        Intelligence: Number,
        Wisdom: Number,
        Charisma: Number,
      },
      traits: [
        {
          name: String,
          description: String,
        },
      ],
    },
  ],
});

module.exports = raceSchema;
