const mongoose = require("mongoose");
const characterSchema = require("../models/characterModel");

// Middleware
characterSchema.pre("save", function (next) {
  const predefinedRaces = [
    "Dragonborn",
    "Dwarf",
    "Elf",
    "Gnome",
    "Half-Elf",
    "Half-Orc",
    "Halfling",
    "Human",
    "Tiefling",
  ];
  //sets the isCustomRace field to true if the submitted race doesn't contain one of the predefined races above
  this.isCustomRace = !predefinedRaces.includes(this.race);
  next();
});

characterSchema.pre("save", function (next) {
  const predefinedClasses = [
    "Barbarian",
    "Bard",
    "Cleric",
    "Druid",
    "Fighter",
    "Monk",
    "Paladin",
    "Ranger",
    "Rogue",
    "Sorcerer",
    "Warlock",
    "Wizard",
  ];
  this.isCustomClass = !predefinedClasses.includes(this.characterClass);
  next();
});

characterSchema.pre("save", function (next) {
  const character = this;

  // roll dice for ability scores if they are not set
  for (let ability in character.stats.abilityScore) {
    if (character.stats.abilityScore[ability] == null) {
      character.stats.abilityScore[ability] = rollDice();
    }
  }

  // calculate ability modifiers
  for (let ability in character.stats.abilityScore) {
    character.stats.abilityModifier[ability] = calculateAbilityModifier(
      character.stats.abilityScore[ability]
    );
  }

  // calculate proficiency bonus
  character.proficiencyBonus = calculateProficiencyBonus(character.stats.level);

  // calculate passive wisdom
  character.stats.passiveWisdom = 10 + character.abilityModifier.Wisdom;

  // add perception proficiency bonus if character has proficiency in perception
  if (character.proficiencies.perception) {
    character.passiveWisdom += character.stats.proficiencyBonus;
  }

  next();
});

characterSchema.pre("updateOne", function (next) {
  const character = this._update;

  character.proficiencyBonus = calculateProficiencyBonus(character.stats.level);
  // calculate passive wisdom
  character.passiveWisdom = 10 + character.abilityModifier.Wisdom;

  // add perception proficiency bonus if character has proficiency in perception
  if (character.proficiencies.perception) {
    character.passiveWisdom += character.proficiencyBonus;
  }
  next();
});

// Functions
const calculateAbilityModifier = (score) => {
  return Math.floor((score - 10) / 2);
};

const calculateProficiencyBonus = (level) => {
  return 1 + Math.floor(level / 4);
};

const rollDice = () => {
  const rolls = [];
  for (let i = 0; i < 4; i++) {
    rolls.push(Math.floor(Math.random() * 6) + 1);
  }
  rolls.sort((a, b) => b - a);
  rolls.pop();
  return rolls.reduce((a, b) => a + b, 0);
};

const Character = mongoose.model("Character", characterSchema);
module.exports = Character;
