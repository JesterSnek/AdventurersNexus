const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const characterSchema = new Schema({
  user_id: {
    type: String,
    required: [true, "A character must belong to a user!"],
  },
  name: String,
  surname: String,
  race: {
    type: String,
    required: [true, "A character must belong to a race."],
  },
  isCustomRace: {
    type: Boolean,
  },
  characterClass: {
    type: String,
    required: [true, "A character must have a class."],
  },
  isCustomClass: {
    type: Boolean,
  },
  stats: {
    level: {
      type: Number,
      default: 1,
    },
    armorClass: Number,
    initiativeBonus: Number,
    speed: Number,
    proficiencyBonus: Number,
    hitPointMaximum: Number,
    currentHitPoints: Number,
    temporaryHitPoints: Number,

    passiveWisdom: Number,
    spellSaveDC: Number,
    spellAttackBonus: Number,
    abilityScore: {
      Strenght: Number,
      Dexterity: Number,
      Constitution: Number,
      Intelligence: Number,
      Wisdom: Number,
      Charisma: Number,
    },
    abilityModifier: {
      Strenght: Number,
      Dexterity: Number,
      Constitution: Number,
      Intelligence: Number,
      Wisdom: Number,
      Charisma: Number,
    },
  },
  proficiencyBonus: Number,
  proficiencies: {
    acrobatics: Boolean,
    animalHandling: Boolean,
    arcana: Boolean,
    athletics: Boolean,
    deception: Boolean,
    history: Boolean,
    insight: Boolean,
    intimidation: Boolean,
    investigation: Boolean,
    medicine: Boolean,
    nature: Boolean,
    perception: Boolean,
    performance: Boolean,
    persuasion: Boolean,
    religion: Boolean,
    sleightOfHand: Boolean,
    stealth: Boolean,
    survival: Boolean,
  },
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
  spells: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Spell",
    },
  ],
});

module.exports = characterSchema;
