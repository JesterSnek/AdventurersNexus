const proficiencyNames = [
  "Acrobatics",
  "AnimalHandling",
  "Arcana",
  "Athletics",
  "Deception",
  "History",
  "Insight",
  "Intimidation",
  "Investigation",
  "Medicine",
  "Nature",
  "Perception",
  "Performance",
  "Persuasion",
  "Religion",
  "SleightOfHand",
  "Stealth",
  "Survival",
];

exports.generateProficienciesSchema = () => {
  const schema = {};
  for (const name of proficiencyNames) {
    schema[name] = { type: Boolean, default: false };
  }
  return schema;
};
