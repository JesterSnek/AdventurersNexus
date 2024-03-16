const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classSchema = new Schema({
  name: {
    type: String,
    required: [true, "A character must have a class."],
  },
  description: String,
  isCustomClass: {
    type: Boolean,
    default: false,
  },
  hit_dice: String,
  primary_ability: {
    type: String,
    enum: [
      "Strength",
      "Dexterity",
      "Constitution",
      "Intelligence",
      "Wisdom",
      "Charisma",
    ],
  },
  saving_throw_proficiencies: [String],
  armor_proficiencies: [String],
  weapon_proficiencies: [String],
  tool_proficiencies: [String],
  skill_proficiencies: {
    number: Number,
    choices: [String],
  },
  equipment: [String],
  base_attack_bonus: Number,
  fort_save: Number,
  ref_save: Number,
  will_save: Number,
  special: [String],
  spells_per_day: Number,
  spellcasting_ability: String,
  spell_list: [String],
  class_features: [
    {
      name: String,
      level: Number,
      description: String,
    },
  ],
  subclasses: [
    {
      name: String,
      description: String,
      subclass_features: [
        {
          name: String,
          level: Number,
          description: String,
        },
      ],
    },
  ],
});

module.exports = classSchema;
