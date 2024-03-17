const mongoose = require("mongoose");
const characterSchema = require("../models/characterModel");

// Middleware
characterSchema.pre("save", function (next) {
  const character = this;

  // roll dice for ability scores if they are not set
  for (let ability in character.stats.abilityScore) {
    if (character.stats.abilityScore[ability] == null) {
      character.stats.abilityScore[ability] = rollDice();
    }
    // Adds the racial ability score increases to the character ability scores
    if (character.race.abilityScoreIncreases) {
      character.stats.abilityScore[ability] +=
        character.race.abilityScoreIncreases[ability] || 0;
    }
  }

  // calculate ability modifiers
  for (let ability in character.stats.abilityScore) {
    character.stats.abilityModifier[ability] = calculateAbilityModifier(
      character.stats.abilityScore[ability]
    );
  }

  // calculate proficiency bonus
  character.stats.proficiencyBonus = calculateProficiencyBonus(
    character.stats.level
  );

  // Go through the skill proficiencies from the characters background and set the characters proficiencies object
  character.background.skillProficiencies.forEach((skillProficiency) => {
    character.proficiencies[skillProficiency] = true;
  });

  // calculate passive wisdom
  character.stats.passiveWisdom = 10 + character.stats.abilityModifier.Wisdom;

  // add perception proficiency bonus if character has proficiency in perception
  if (character.proficiencies.Perception) {
    character.stats.passiveWisdom += character.stats.proficiencyBonus;
  }

  next();
});

characterSchema.pre("updateOne", function (next) {
  const character = this._update;
  // Calculate character proficiency bonus after every update since it's based on character level
  character.proficiencyBonus = calculateProficiencyBonus(character.stats.level);
  // calculate passive wisdom
  character.passiveWisdom = 10 + character.abilityModifier.Wisdom;

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
