const mongoose = require("mongoose");
const { generateProficienciesSchema } = require("./schemaUtils");
const backgroundSchema = require("./backgroundModel");
const classSchema = require("./characterClassModel");
const raceSchema = require("./raceModel");

const Schema = mongoose.Schema;

const characterSchema = new Schema({
  user_id: {
    type: String,
    required: [true, "A character must belong to a user!"],
  },
  name: String,
  surname: String,
  race: raceSchema,
  characterClass: classSchema,
  background: backgroundSchema,
  stats: {
    level: {
      type: Number,
      default: 1,
    },
    armorClass: Number,
    initiativeBonus: Number,
    proficiencyBonus: Number,
    hitPointMaximum: Number,
    currentHitPoints: Number,
    temporaryHitPoints: Number,
    proficiencyBonus: Number,
    passiveWisdom: Number,
    spellSaveDC: Number,
    spellAttackBonus: Number,
    abilityScore: {
      Strength: Number,
      Dexterity: Number,
      Constitution: Number,
      Intelligence: Number,
      Wisdom: Number,
      Charisma: Number,
    },
    abilityModifier: {
      Strength: Number,
      Dexterity: Number,
      Constitution: Number,
      Intelligence: Number,
      Wisdom: Number,
      Charisma: Number,
    },
  },
  proficiencies: generateProficienciesSchema(),
  gear: {
    armour: String,
    armourType: {
      type: String,
      enum: ["light", "medium", "heavy"],
    },
    weapon: {
      melee: String,
      ranged: String,
    },
  },
  spells: [String],
});

module.exports = characterSchema;
