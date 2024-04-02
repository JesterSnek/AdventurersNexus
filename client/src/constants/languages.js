const languageNames = [
  "Common",
  "Dwarvish",
  "Elvish",
  "Giant",
  "Gnomish",
  "Goblin",
  "Halfling",
  "Orc",
];

export const languages = languageNames.map((name) => ({
  value: name,
  label: name,
}));
