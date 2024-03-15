const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const { generateProficienciesSchema } = require("./schemaUtils");

const characterSchema = new Schema({
  user_id: {
    type: String,
    required: [true, "A character must belong to a user!"],
  },
  name: String,
  surname: String,
  race: {
    name: {
      type: String,
      required: [true, "A character must belong to a race."],
    },
    raceAbilityScoreIncreases: {
      strength: Number,
      dexterity: Number,
      constitution: Number,
      intelligence: Number,
      wisdom: Number,
      charisma: Number,
    },
    age: String,
    size: String,
    speed: Number,
    languages: [String],
    // racialTraits: [
    //   {
    //     traitName: String,
    //     traitDescription: String,
    //   },
    // ],
    isCustomRace: {
      type: Boolean,
    },
  },
  isCustomRace: {
    type: Boolean,
  },
  characterClass: {
    name: {
      type: String,
      required: [true, "A character must have a class."],
    },
    hitDice: String,
    primaryAbility: {
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
    savingThrowProficiencies: [String],
    armorProficiencies: [String],
    weaponProficiencies: [String],
    toolProficiencies: [String],
    // classFeatures: [
    //   {
    //     featureName: String,
    //     featureDescription: String,
    //   },
    // ],
    isCustomClass: {
      type: Boolean,
    },
  },
  background: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Background",
  },
  customBackground: {
    name: String,
    description: String,
    equipment: [String],
    languages: [String],
    skillProficiencies: [String],
    toolProficiencies: [String],
    // backgroundFeatures: [
    //   {
    //     featureName: String,
    //     featureDescription: String,
    //   },
    // ],
    personalityTraits: String,
    ideals: String,
    bonds: String,
    flaws: String,
  },
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
  proficiencyBonus: Number,
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
  spells: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Spell",
    },
  ],
});

module.exports = characterSchema;
