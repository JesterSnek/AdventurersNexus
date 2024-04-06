const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const characterClassSchema = new Schema({
  name: { type: String, required: (true, "A character must have a class.") },
  isCustom: { type: Boolean, default: false },
  description: String,
  hitDice: String,
  primaryAbility: {
    type: [String],
    enum: [
      "Strength",
      "Dexterity",
      "Constitution",
      "Intelligence",
      "Wisdom",
      "Charisma",
    ],
  },
  savingThrowProficiencies: {
    type: [String],
    enum: [
      "Strength",
      "Dexterity",
      "Constitution",
      "Intelligence",
      "Wisdom",
      "Charisma",
    ],
  },
  armorProficiencies: [String],
  weaponProficiencies: [String],
  toolProficiencies: [String],
  skillProficiencies: [String],
  startingEquipment: [
    {
      equipment: [String],
    },
  ],
  classFeatures: [
    {
      level: Number,
      features: [
        {
          name: String,
          description: String,
        },
      ],
    },
  ],
  subclasses: [
    {
      name: String,
      description: String,
      features: [
        {
          level: Number,
          name: String,
          description: String,
        },
      ],
    },
  ],
  spellcasting: {
    spellcastingAbility: String,
    cantripsKnown: [Number],
    spellsKnown: [Number],
    spellSlots: [
      {
        level: Number,
        slots: [
          {
            level: Number,
            count: Number,
          },
        ],
      },
    ],
    spellList: [String],
  },
});

module.exports = characterClassSchema;
