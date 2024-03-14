const proficiencyNames = [
  "acrobatics",
  "animalHandling",
  "arcana",
  "athletics",
  "deception",
  "history",
  "insight",
  "intimidation",
  "investigation",
  "medicine",
  "nature",
  "perception",
  "performance",
  "persuasion",
  "religion",
  "sleightOfHand",
  "stealth",
  "survival",
];

exports.generateProficienciesSchema = () => {
  const schema = {};
  for (const name of proficiencyNames) {
    schema[name] = { type: Boolean, default: false };
  }
  return schema;
};
